const pool = require('../config/database');

// OBTENER TODAS LAS TUTORÍAS
const obtenerTutorias = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM Tutoria 
      ORDER BY fecha DESC
    `);
    
    res.json({
      success: true,
      tutorias: result.rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREAR TUTORÍA
const crearTutoria = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    
    const result = await pool.query(
      `INSERT INTO Tutoria (nombre, descripcion) 
       VALUES ($1, $2) RETURNING *`,
      [nombre, descripcion]
    );
    
    res.status(201).json({
      success: true,
      tutoria: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ACTUALIZAR TUTORÍA
const actualizarTutoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    
    const result = await pool.query(
      `UPDATE Tutoria SET nombre = $1, descripcion = $2 
       WHERE id_tutoria = $3 RETURNING *`,
      [nombre, descripcion, id]
    );
    
    res.json({
      success: true,
      tutoria: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ELIMINAR TUTORÍA
const eliminarTutoria = async (req, res) => {
  try {
    const { id } = req.params;
    
    await pool.query('DELETE FROM Tutoria WHERE id_tutoria = $1', [id]);
    
    res.json({
      success: true,
      message: 'Tutoría eliminada correctamente'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  obtenerTutorias,
  crearTutoria,
  actualizarTutoria,
  eliminarTutoria
};