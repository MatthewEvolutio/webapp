$('.ui.rating')
  .rating()
;

// Session storage helpers for temporary data persistence
const SessionData = {
  init() {
    if (!sessionStorage.getItem('sessionId')) {
      sessionStorage.setItem('sessionId', Date.now().toString());
    }
  },

  getDeletedCategories() {
    return JSON.parse(sessionStorage.getItem('deletedCategories') || '[]');
  },

  addDeletedCategory(id) {
    const deleted = this.getDeletedCategories();
    deleted.push(id);
    sessionStorage.setItem('deletedCategories', JSON.stringify(deleted));
  },

  getAddedCategories() {
    return JSON.parse(sessionStorage.getItem('addedCategories') || '[]');
  },

  addCategory(category) {
    const added = this.getAddedCategories();
    added.push(category);
    sessionStorage.setItem('addedCategories', JSON.stringify(added));
  },

  getDeletedEvents() {
    return JSON.parse(sessionStorage.getItem('deletedEvents') || '{}');
  },

  addDeletedEvent(categoryId, eventId) {
    const deleted = this.getDeletedEvents();
    if (!deleted[categoryId]) deleted[categoryId] = [];
    deleted[categoryId].push(eventId);
    sessionStorage.setItem('deletedEvents', JSON.stringify(deleted));
  },

  getAddedEvents() {
    return JSON.parse(sessionStorage.getItem('addedEvents') || '{}');
  },

  addEvent(categoryId, event) {
    const added = this.getAddedEvents();
    if (!added[categoryId]) added[categoryId] = [];
    added[categoryId].push(event);
    sessionStorage.setItem('addedEvents', JSON.stringify(added));
  },

  getEditedEvents() {
    return JSON.parse(sessionStorage.getItem('editedEvents') || '{}');
  },

  editEvent(categoryId, eventId, updates) {
    const edited = this.getEditedEvents();
    const key = `${categoryId}_${eventId}`;
    edited[key] = updates;
    sessionStorage.setItem('editedEvents', JSON.stringify(edited));
  }
};

// Initialize session data
SessionData.init();

// Client-side only operations - changes persist in browser session

// Handle delete category - visually remove from page
document.addEventListener('click', (e) => {
  const deleteLink = e.target.closest('a[href*="/deletecategory/"]');
  if (deleteLink) {
    e.preventDefault();
    const categoryId = deleteLink.href.split('/deletecategory/')[1];
    // Find the section containing the category
    const categorySection = deleteLink.closest('section.ui.middle.aligned.segment');
    if (categorySection) {
      SessionData.addDeletedCategory(categoryId);
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
    const href = deleteLink.href;
    const parts = href.split('/');
    const categoryId = parts[parts.indexOf('event') + 1];
    const eventId = parts[parts.indexOf('deleteevent') + 1];

    // Find the table row containing the event
    const eventRow = deleteLink.closest('tr');
    // Also find and remove the corresponding edit row
    const index = eventRow.id.replace('event', '');
    const editRow = document.querySelector(`#edit${index}`);

    if (eventRow) {
      SessionData.addDeletedEvent(categoryId, eventId);
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

    const newCategoryId = 'temp-' + Date.now();
    const categoryData = {
      category_id: newCategoryId,
      category: category,
      rating: rating
    };

    SessionData.addCategory(categoryData);

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
        <a href="/event/${newCategoryId}">
          <span class="cubing-icon unofficial-333mts"></span>
        </a>
        <a href="/dashboard/deletecategory/${newCategoryId}" onclick="event.preventDefault(); this.closest('section').remove();">
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

    // Get category ID from URL
    const categoryId = window.location.pathname.split('/event/')[1];
    const newEventId = 'temp-event-' + Date.now();

    const eventData = {
      event_id: newEventId,
      name: name,
      cutoff: cutoff,
      avg_type: avgType,
      wr_vid: wrVid
    };

    SessionData.addEvent(categoryId, eventData);

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
          <a href="#" title="Delete Event" onclick="event.preventDefault(); this.closest('tr').remove();">
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

      // Get category and event ID from URL
      const urlParts = form.action.split('/');
      const categoryId = urlParts[urlParts.indexOf('event') + 1];
      const eventId = urlParts[urlParts.indexOf('updateevent') + 1];

      SessionData.editEvent(categoryId, eventId, { cutoff, avg_type: avgType, wr_vid: wrVid });

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

