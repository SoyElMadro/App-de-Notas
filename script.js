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
    
    

    const editNote = document.createElement("i");
    editNote.classList.add('bx', 'bxs-edit');
    editNote.addEventListener("click", () => {
      console.log("Editando...")
      noteInput.disabled = false;
    })

    if (colorPicker.value === "#000000") {
      noteContent.style.color = "#ffffff";
      titleElement.style.color = '#ffffff';
      editNote.classList.remove('bxs-edit');
      editNote.style.backgroundColor = '#fff'
      editNote.classList.add('bx-edit');
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar";
    deleteBtn.addEventListener("click", () => {
      note.remove();
    });
    
    noteHeader.appendChild(titleElement);
    noteHeader.appendChild(editNote);
    noteFooter.appendChild(deleteBtn);
    
    note.appendChild(noteHeader);
    note.appendChild(noteContent);
    note.appendChild(noteFooter);
    
    notesContainer.appendChild(note);
    
    noteInput.value = "";
    colorPicker.value = "#ffffff";
  }
}
