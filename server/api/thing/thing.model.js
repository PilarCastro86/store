'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './thing.events';

var BiblitecaSchema = new mongoose.Schema({
  titulo: String,
  anio: Number,
  autor: String
});

registerEvents(BiblitecaSchema);
export default mongoose.model('Biblioteca', BiblitecaSchema);
