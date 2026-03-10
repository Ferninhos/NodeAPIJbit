const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/token', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Campos username e password são obrigatórios' });
  }

  if (username === 'admin' && password === 'admin123') {
    const token = jwt.sign(
      { username, role: 'admin' },
      process.env.JWT_SECRET || 'chave_secreta_padrao',
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      message: 'Autenticação realizada com sucesso',
      token,
    });
  }

  res.status(401).json({ error: 'Credenciais inválidas' });
});

module.exports = router;
