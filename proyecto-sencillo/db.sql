CREATE TABLE IF NOT EXISTS registros (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  categoria VARCHAR(255),
  fecha DATE,
  monto DECIMAL(10,2),
  notas TEXT
);
