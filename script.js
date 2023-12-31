const createBtn = document.getElementById("create-btn");
const colorPicker = document.getElementById("color-picker");
const noteTitle = document.getElementById("note-title");
const noteInput = document.getElementById("note-input");
const notesContainer = document.getElementById("notes-container");

let notes = [];

if (localStorage.getItem("notes")) {
  notes = JSON.parse(localStorage.getItem("notes"));
  restoreNotes();
}

createBtn.addEventListener("click", createNote);

function createNote() {
  const noteTitleText = noteTitle.value.trim();
  const noteText = noteInput.value.trim();
  const noteColor = colorPicker.value;

  if (noteTitleText !== "" && noteText !== "") {
    const note = {
      id: generateUniqueId(),
      title: noteTitleText,
      content: noteText,
      color: noteColor,
    };

    notes.push(note);
    updateLocalStorage();
    addNoteToContainer(note);

    noteInput.value = "";
    colorPicker.value = "#ffffff";
  }
}

function addNoteToContainer(note) {
  const noteElement = document.createElement("div");
  noteElement.className = "note";
  noteElement.style.backgroundColor = note.color;

  const noteContent = document.createElement("p");
  noteContent.textContent = note.content;

  const noteHeader = document.createElement("div");
  noteHeader.className = "note-header";

  const noteFooter = document.createElement("div");
  noteFooter.className = "note-footer";

  const titleElement = document.createElement("h3");
  titleElement.textContent = note.title;

  const editNoteIcon = document.createElement("i");
  editNoteIcon.classList.add("bx", "bxs-edit");
  editNoteIcon.addEventListener("click", () => {
    if (noteElement.classList.contains("editing")) {
      noteElement.classList.remove("editing");
      editNoteIcon.classList.remove("bx-x-circle");
      editNoteIcon.classList.add("bxs-edit");
      titleElement.contentEditable = false;
      noteContent.contentEditable = false;
      if (
        note.title !== titleElement.textContent ||
        note.content !== noteContent.textContent
      ) {
        note.title = titleElement.textContent;
        note.content = noteContent.textContent;
        updateLocalStorage();
      }
    } else {
      noteElement.classList.add("editing");
      editNoteIcon.classList.remove("bxs-edit");
      editNoteIcon.classList.add("bx-x-circle");
      titleElement.contentEditable = true;
      noteContent.contentEditable = true;
      titleElement.focus();
    }
  });

  if (note.color === "#000000") {
    noteContent.style.color = "#ffffff";
    titleElement.style.color = "#ffffff";
    editNoteIcon.classList.remove("bxs-edit");
    editNoteIcon.style.backgroundColor = "#fff";
    editNoteIcon.classList.add("bx-edit");
  }

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Eliminar";
  deleteBtn.addEventListener("click", (e) => {
    noteElement.remove();
    deleteNoteFromStorage(note.id);
  });

  noteHeader.appendChild(titleElement);
  noteHeader.appendChild(editNoteIcon);
  noteFooter.appendChild(deleteBtn);

  noteElement.appendChild(noteHeader);
  noteElement.appendChild(noteContent);
  noteElement.appendChild(noteFooter);
  noteElement.setAttribute("id", note.id);

  notesContainer.appendChild(noteElement);
}

function updateLocalStorage() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function restoreNotes() {
  notes.forEach((note) => {
    addNoteToContainer(note);
  });
}

function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36);
}

function deleteNoteFromStorage(noteId) {
  notes = notes.filter((note) => note.id !== noteId);
  updateLocalStorage();
}
