const express = require('express');
const {
  obtenerTutorias,
  crearTutoria,
  actualizarTutoria,
  eliminarTutoria
} = require('../controllers/tutoriasController');

const router = express.Router();

router.get('/', obtenerTutorias);
router.post('/', crearTutoria);
router.put('/:id', actualizarTutoria);
router.delete('/:id', eliminarTutoria);

module.exports = router;