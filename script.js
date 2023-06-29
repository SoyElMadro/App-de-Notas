const createBtn = document.getElementById("create-btn");
const colorPicker = document.getElementById("color-picker");
const noteTitle = document.getElementById("note-title");
const noteInput = document.getElementById("note-input");
const notesContainer = document.getElementById("notes-container");

createBtn.addEventListener("click", createNote);

function createNote() {
  const noteTitleText = noteTitle.value.trim();
  const noteText = noteInput.value.trim();
  
  if (noteTitleText !== "" && noteText !== "") {
    const note = document.createElement("div");
    note.className = "note";
    note.style.backgroundColor = colorPicker.value;
    
    const noteContent = document.createElement("p");
    noteContent.textContent = noteText;
    
    const noteHeader = document.createElement("div");
    noteHeader.className = "note-header";
    
    const noteFooter = document.createElement("div");
    noteFooter.className = "note-footer";
    
    const titleElement = document.createElement("h3");
    titleElement.textContent = noteTitleText;

    const editNoteIcon = document.createElement("i");
    editNoteIcon.classList.add('bx', 'bxs-edit');
    editNoteIcon.addEventListener("click", () => {
      if (note.classList.contains("editing")) {
        note.classList.remove("editing");
        editNoteIcon.classList.remove("bx-x-circle");
        editNoteIcon.classList.add("bxs-edit");
        titleElement.contentEditable = false;
        noteContent.contentEditable = false;
      } else {
        note.classList.add("editing");
        editNoteIcon.classList.remove("bxs-edit");
        editNoteIcon.classList.add("bx-x-circle");
        titleElement.contentEditable = true;
        noteContent.contentEditable = true;
        titleElement.focus();
      }
    });

    if (colorPicker.value === "#000000") {
      noteContent.style.color = "#ffffff";
      titleElement.style.color = '#ffffff';
      editNoteIcon.classList.remove('bxs-edit');
      editNoteIcon.style.backgroundColor = '#fff'
      editNoteIcon.classList.add('bx-edit');
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar";
    deleteBtn.addEventListener("click", () => {
      note.remove();
    });
    
    noteHeader.appendChild(titleElement);
    noteHeader.appendChild(editNoteIcon);
    noteFooter.appendChild(deleteBtn);
    
    note.appendChild(noteHeader);
    note.appendChild(noteContent);
    note.appendChild(noteFooter);
    
    notesContainer.appendChild(note);
    
    noteInput.value = "";
    colorPicker.value = "#ffffff";
  }
}
