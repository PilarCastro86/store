/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/things              ->  index
 * POST    /api/things              ->  create
 * GET     /api/things/:id          ->  show
 * PUT     /api/things/:id          ->  upsert
 * PATCH   /api/things/:id          ->  patch
 * DELETE  /api/things/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Biblioteca from './thing.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function (entity) {
    try {
      // eslint-disable-next-line prefer-reflect
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch (err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Things
export function index(req, res) {
  Biblioteca.find({}, (err, libros) => {
    if (err) return res.status(500).send({ mensaje: 'ERROR AL BUSCAR LOS LIBROS' })
    res.send(200, ({ libros }))
  })
}

// Gets a single Thing from the DB
export function show(req, res) {
  let librosId = req.params.librosId
  Biblioteca.findById(librosId, (err, libros) => {
    if (err) return res.status(500).send({ mensaje: 'ERROR AL BUSCAR EL LIBRO' });
    if (!libros) return res.status(404).send({ mensaje: 'EL LIBRO NO EXISTE' })
    res.send(200, ({ libros }))
  })
}

// Creates a new Thing in the DB
export function create(req, res) {
  let libro = new Biblioteca()
  libro.titulo = req.body.titulo;
  libro.anio = req.body.anio;
  libro.autor = req.body.autor;

  libro.save((err, bookStored) => {
    if (err) return res.status(500).send({ mensaje: 'NO SE PUEDE CONECTAR A LA BD' })
    return res.status(200).send({ mensaje: bookStored })
  })
}

// Upserts the given Thing in the DB at the specified ID
export function upsert(req, res) {
  let librosId = req.params.librosId
  let updateId = req.body

  Biblioteca.findByIdAndUpdate(librosId, updateId, (err, updateId) => {
    if (err) {
      return res.status(500).send({ mensaje: 'no se puede actualizar el libro' })
    }
    res.status(200).send({ libros: updateId })
  })
}


// Deletes a Thing from the DB
export function destroy(req, res) {
  let librosId = req.params.librosId
  Biblioteca.findById(librosId, (err, libros) => {
    if (err) {
      return res.status(500).send({ mensaje: 'no se puede eliminar el libro' })
    }
    Biblioteca.remove(err => {
      if (err) {
        return res.status(500).send({ mensaje: 'no se puede eliminar el libro' })
      }
      res.status(200).send({ mensaje: 'producto eliminado' })
    })
  })
}
