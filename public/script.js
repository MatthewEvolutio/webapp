$('.ui.rating')
  .rating()
;

// Client-side only operations - changes persist in browser until page refresh/navigation

// Handle delete category - visually remove from page
document.addEventListener('click', (e) => {
  const deleteLink = e.target.closest('a[href*="/deletecategory/"]');
  if (deleteLink) {
    e.preventDefault();
    // Find the section containing the category
    const categorySection = deleteLink.closest('section.ui.middle.aligned.segment');
    if (categorySection && confirm('Delete this category? (Changes not saved to server)')) {
      categorySection.style.transition = 'opacity 0.3s';
      categorySection.style.opacity = '0';
      setTimeout(() => categorySection.remove(), 300);
    }
  }
});

// Handle delete event - visually remove from page
document.addEventListener('click', (e) => {
  const deleteLink = e.target.closest('a[href*="/deleteevent/"]');
  if (deleteLink) {
    e.preventDefault();
    // Find the table row containing the event
    const eventRow = deleteLink.closest('tr');
    // Also find and remove the corresponding edit row
    const index = eventRow.id.replace('event', '');
    const editRow = document.querySelector(`#edit${index}`);

    if (eventRow && confirm('Delete this event? (Changes not saved to server)')) {
      eventRow.style.transition = 'opacity 0.3s';
      eventRow.style.opacity = '0';
      if (editRow) {
        editRow.style.transition = 'opacity 0.3s';
        editRow.style.opacity = '0';
      }
      setTimeout(() => {
        eventRow.remove();
        if (editRow) editRow.remove();
      }, 300);
    }
  }
});

// Handle add category form - add to page dynamically
const addCategoryForm = document.querySelector('form[action*="/addcategory"]');
if (addCategoryForm) {
  addCategoryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(addCategoryForm);
    const category = formData.get('category');
    const rating = formData.get('rating') || 0;

    // Find the categories container
    const container = document.querySelector('section.ui.center.aligned.middle.aligned.segment');
    if (container && category) {
      // Create new category section
      const newSection = document.createElement('section');
      newSection.className = 'ui middle aligned segment';
      newSection.innerHTML = `
        <h3 class="ui header">${category.toUpperCase()}</h3>
        ${rating > 0 ? `
        <p>
          <span class="ui yellow disabled rating" data-icon="star" data-rating="${rating}" data-max-rating="5"></span>
          <span style="color: grey; font-size: 90%; font-style: italic">Rating: ${rating}/5</span>
        </p>
        ` : ''}
        <a href="/event/new-${Date.now()}">
          <span class="cubing-icon unofficial-333mts"></span>
        </a>
        <a href="/dashboard/deletecategory/new-${Date.now()}" onclick="event.preventDefault(); if(confirm('Delete?')) this.closest('section').remove();">
          <i class="ui trash black icon"></i>
        </a>
      `;
      container.appendChild(newSection);
      addCategoryForm.reset();

      // Initialize rating
      $(newSection).find('.ui.rating').rating();
    }
  });
}

// Handle add event form - add to list dynamically
const addEventForm = document.querySelector('form[action*="/addevent"]');
if (addEventForm) {
  addEventForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(addEventForm);
    const name = formData.get('name');
    const cutoff = formData.get('cutoff');
    const avgType = formData.get('avg_type');
    const wrVid = formData.get('wr_vid');

    // Find the events table tbody
    const tbody = document.querySelector('table.ui.fixed.striped.table tbody');
    if (tbody && name) {
      const newIndex = tbody.querySelectorAll('tr').length;
      // Create new event row
      const newRow = document.createElement('tr');
      newRow.id = `event${newIndex}`;
      newRow.innerHTML = `
        <td><span class="cubing-icon event-333"></span> ${name.toUpperCase()}</td>
        <td>${cutoff || 'N/A'}</td>
        <td>${avgType || 'N/A'}</td>
        <td>${wrVid ? `<iframe class="vid" src="${wrVid}" allowfullscreen></iframe>` : 'N/A'}</td>
        <td class="center aligned">
          <button title="Edit Event" class="editSubmit">
            <i class="ui pencil icon"></i>
          </button>
        </td>
        <td class="center aligned">
          <a href="#" title="Delete Event" onclick="event.preventDefault(); if(confirm('Delete?')) this.closest('tr').remove();">
            <i class="ui black trash icon"></i>
          </a>
        </td>
      `;
      tbody.appendChild(newRow);
      addEventForm.reset();
    }
  });
}

// Handle edit event form - update existing item
document.addEventListener('submit', (e) => {
  if (e.target.matches('form[action*="/updateevent/"]')) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    // Get the index from the form's parent row
    const editRow = form.closest('tr');
    const index = editRow.id.replace('edit', '');
    const eventRow = document.querySelector(`#event${index}`);

    if (eventRow) {
      const cutoff = formData.get('cutoff');
      const avgType = formData.get('avg_type');
      const wrVid = formData.get('wr_vid');

      // Update the event row cells
      const cells = eventRow.querySelectorAll('td');
      if (cells[1]) cells[1].textContent = cutoff || 'N/A';
      if (cells[2]) cells[2].textContent = avgType || 'N/A';
      if (cells[3] && wrVid) {
        cells[3].innerHTML = `<iframe class="vid" src="${wrVid}" allowfullscreen></iframe>`;
      }

      // Hide edit row, show event row
      editRow.style.display = 'none';
      eventRow.style.display = 'table-row';
    }
  }
});

