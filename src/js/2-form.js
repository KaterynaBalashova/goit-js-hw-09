let formData = {
    email: "",
    message: "",
};

const form = document.querySelector(".feedback-form");
const localStorageKey = "feedback-form-state";

const savedData = localStorage.getItem(localStorageKey);

if (savedData) {
  const parsedData = JSON.parse(savedData);
  formData = parsedData;

  form.elements.email.value = parsedData.email || "";
  form.elements.message.value = parsedData.message || "";
};

form.addEventListener('input', evt => {
    const { name, value } = evt.target;
    formData[name] = value.trim();
    localStorage.setItem(localStorageKey, JSON.stringify(formData));
  });

  form.addEventListener('submit', evt => {
      evt.preventDefault();
      
    if (!formData.email || !formData.message) {
      alert('Fill please all fields');
      return;
    }
  
      console.log(formData);
      
    formData = { email: "", message: "" };
    localStorage.removeItem(localStorageKey);
    form.reset();
  });
