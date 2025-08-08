document.addEventListener('DOMContentLoaded', () => {
  cargarRegistros();
  const form = document.getElementById('registroForm');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const datos = {
      nombre: form.nombre.value,
      categoria: form.categoria.value,
      fecha: form.fecha.value,
      monto: parseFloat(form.monto.value),
      notas: form.notas.value
    };
    fetch('/api/registros', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(datos)
    }).then(() => {
      form.reset();
      cargarRegistros();
    });
  });
});

function cargarRegistros() {
  fetch('/api/registros')
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector('#registros tbody');
      tbody.innerHTML = '';
      data.forEach(r => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${r.id}</td>
          <td>${r.nombre}</td>
          <td>${r.categoria || ''}</td>
          <td>${r.fecha || ''}</td>
          <td>${r.monto || ''}</td>
          <td>${r.notas || ''}</td>
          <td><button data-id="${r.id}" class="eliminar">Eliminar</button></td>
        `;
        tbody.appendChild(tr);
      });
      document.querySelectorAll('.eliminar').forEach(btn => {
        btn.addEventListener('click', evt => {
          const id = evt.target.dataset.id;
          fetch(`/api/registros/${id}`, {method: 'DELETE'})
            .then(() => cargarRegistros());
        });
      });
    });
}
