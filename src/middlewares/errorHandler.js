function errorHandler(err, req, res, _next) {
  console.error('Erro:', err.message);

  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      error: 'Erro de validação',
      details: messages,
    });
  }

  if (err.code === 11000) {
    return res.status(409).json({
      error: 'Registro duplicado',
      details: 'Já existe um registro com os dados informados',
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      error: 'Dados inválidos',
      details: `Valor inválido para o campo "${err.path}"`,
    });
  }

  res.status(500).json({
    error: 'Erro interno do servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
}

module.exports = errorHandler;
