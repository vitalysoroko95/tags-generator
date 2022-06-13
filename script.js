const tagInput = document.querySelector(".tag-input");
const readonly = document.querySelector(".readonly");
const submit = document.querySelector(".submit-btn");
const tagList = document.querySelector(".tag-list");
const ul = document.querySelector(".tag-list ul");

let tags = [];

const getItemsFromLocalStorage = () => {
  if (localStorage.key("tags").length > 0) {
    let tagsFromLs = localStorage.getItem("tags");
    tags = JSON.parse(tagsFromLs);
    renderTags();
  }
};

const setItemsToLocalStorage = () => {
  if (tags) {
    const arrToString = JSON.stringify(tags);
    localStorage.setItem("tags", arrToString);
  }
};

const addTag = () => {
  if (tagInput.value && !readonly.checked) {
    tags.push(tagInput.value);
    tagInput.value = "";
    renderTags();
  }
};

const readOnlyToggle = () => {
  if (readonly.checked) {
    tagInput.setAttribute("disabled", "disabled");
    submit.setAttribute("disabled", "disabled");
    if (ul.querySelectorAll(".cross")) {
      let cross = ul.querySelectorAll(".cross");
      cross.forEach((item) => {
        item.classList.add("disabled");
      });
    }
  } else {
    tagInput.removeAttribute("disabled", "disabled");
    submit.removeAttribute("disabled", "disabled");
    if (ul.querySelectorAll(".cross")) {
      let cross = ul.querySelectorAll(".cross");
      cross.forEach((item) => {
        item.classList.remove("disabled");
      });
    }
  }
};

const deleteTag = (event) => {
  if (event.target.className == "cross" && !readonly.checked) {
    tags.splice(event.target.dataset.index, 1);
    renderTags();
  }
};

function renderTags() {
  ul.innerHTML = "";
  tags.forEach((tag, index) => {
    createTag(tag, index);
  });
}

function createTag(tag, index) {
  const li = document.createElement("li");
  li.className = "tag";
  const text = document.createTextNode(tag);
  const span = document.createElement("span");
  span.className = "cross";
  span.dataset.index = index;
  li.appendChild(text);
  li.appendChild(span);
  ul.appendChild(li);
}
window.addEventListener("load", getItemsFromLocalStorage);
readonly.addEventListener("click", readOnlyToggle);
ul.addEventListener("click", (e) => {
  deleteTag(e);
});
submit.addEventListener("click", addTag);
window.addEventListener("beforeunload", setItemsToLocalStorage);
