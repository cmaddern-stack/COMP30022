import { useState, useEffect } from "react";
import axios from "axios";
import { GroupsAPI } from "./groupsApi";

const BASE_URL = "https://team-69-backend.herokuapp.com/crm/";

export default class ContactsAPI {
    static toggleStar = async (url, starred) => {
        const form = new FormData();
        form.append("starred", starred);
        const requestOptions = {
            method: "PATCH",
            headers: {
                Authorization: `token ${sessionStorage.getItem("token")}`,
            },
            mode: "cors",
            body: form,
        };
        const response = await fetch(url, requestOptions);
        return response.json();
    };

    static getContact = async (url) => {
        const requestOptions = {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `token ${sessionStorage.getItem("token")}`,
            },
            mode: "cors",
        };
        const response = await fetch(url, requestOptions);
        return response.json();
    };

    static createContact = async (contact) => {
        const requestOptions = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `token ${sessionStorage.getItem("token")}`,
            },
            mode: "cors",
            body: JSON.stringify({
                firstName: contact.firstName,
                lastName: contact.lastName,
                emailAddress: contact.email,
                organisation: contact.organisation,
                role: contact.role,
                phoneNumber: contact.phone,
            }),
        };
        const url = BASE_URL + "contacts/";
        const response = await fetch(url, requestOptions);
        return response.json();
    };

    static editContact = async (url, contact) => {
        const requestOptions = {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `token ${sessionStorage.getItem("token")}`,
            },
            mode: "cors",
            body: JSON.stringify({
                firstName: contact.firstName,
                lastName: contact.lastName,
                emailAddress: contact.email,
                organisation: contact.organisation,
                role: contact.role,
                phoneNumber: contact.phone,
            }),
        };
        const response = await fetch(url, requestOptions);
        return response.json();
    };

    static saveContactPhoto = async (url, image) => {
        const form = new FormData();
        if (image !== null) form.append("image", image);
        const requestOptions = {
            method: "PATCH",
            headers: {
                Authorization: `token ${sessionStorage.getItem("token")}`,
            },
            mode: "cors",
            body: form,
        };
        await fetch(url, requestOptions);
    };

    static deleteContact = async (url) => {
        const requestOptions = {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `token ${sessionStorage.getItem("token")}`,
            },
            mode: "cors",
        };
        const response = await fetch(url, requestOptions);
        await GroupsAPI.deleteEmptyGroups();
        return response.json();
    };

    static customQuestions = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `token ${sessionStorage.getItem("token")}`,
            },
            mode: "cors",
        };
        const url = BASE_URL + "question/";
        const response = await fetch(url, requestOptions);
        return response.json();
    };

    static postQuestion = async (question) => {
        const requestOptions = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `token ${sessionStorage.getItem("token")}`,
            },
            mode: "cors",
            body: JSON.stringify({
                question: question,
            }),
        };
        const url = BASE_URL + "question/";
        const response = await fetch(url, requestOptions);
        return response.json();
    };

    static patchQuestion = async (url, question) => {
        const requestOptions = {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `token ${sessionStorage.getItem("token")}`,
            },
            mode: "cors",
            body: JSON.stringify({
                question: question,
            }),
        };
        const response = await fetch(url, requestOptions);
        return response.json();
    };

    static deleteQuestion = async (url) => {
        const requestOptions = {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `token ${sessionStorage.getItem("token")}`,
            },
            mode: "cors",
        };
        await fetch(url, requestOptions);
    };

    static saveCustomQuestions = async (customInput) => {
        for (var i = 0; i < customInput.length; i++) {
            if (customInput[i].url !== "") {
                ContactsAPI.patchQuestion(
                    customInput[i].url,
                    customInput[i].label
                );
            } else {
                const response = await ContactsAPI.postQuestion(
                    customInput[i].label
                );
                customInput[i].url = response.url;
            }
        }
        return customInput;
    };

    static deleteCustomQuestions = async (deletedInput) => {
        for (var i=0; i<deletedInput.length; i++) {
            await ContactsAPI.deleteQuestion(deletedInput[i].url);
        }
    }

    static customAnswers = async (url) => {
        const requestOptions = {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `token ${sessionStorage.getItem("token")}`,
            },
            mode: "cors",
        };
        const response = await fetch(url + "get_answer/", requestOptions);
        return response.json();
    };

    static saveCustomAnswer = async (question, contact, data) => {
        const requestOptions = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `token ${sessionStorage.getItem("token")}`,
            },
            mode: "cors",
            body: JSON.stringify({
                question: question,
                contact: contact,
                data: data,
            }),
        };
        const url = BASE_URL + "answer/";
        await fetch(url, requestOptions);
    };

    static patchCustomAnswer = async (url, data) => {
        const requestOptions = {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `token ${sessionStorage.getItem("token")}`,
            },
            mode: "cors",
            body: JSON.stringify({
                data: data,
            }),
        };
        await fetch(url, requestOptions);
    };

    static saveCustomAnswers = async (contactURL, customInput) => {
        for (var i = 0; i < customInput.length; i++) {
            if (customInput[i].answerurl !== "") {
                ContactsAPI.patchCustomAnswer(
                    customInput[i].answerurl,
                    customInput[i].value
                );
            } else {
                ContactsAPI.saveCustomAnswer(
                    customInput[i].url,
                    contactURL,
                    customInput[i].value
                );
            }
        }
    };
}

// Getting list of ALL contacts
export async function getContacts() {
    return axios.get("/crm/contacts/").then((res) => res.data);
}

export function useContacts() {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getContacts()
            .then((items) => {
                setItems(items);
                setLoading(false);
            })
            .catch((e) => {
                setError(e);
                setLoading(false);
            });
    }, []);

    return {
        loading,
        items,
        error,
    };
}

// Adding a new contact

/*

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        viewCompleted: false,
        todoList: [],
        modal: false,
        activeItem: {
          title: "",
          description: "",
          completed: false,
        },
      };
    }
  
    componentDidMount() {
      this.refreshList();
    }
  
    refreshList = () => {
      axios
        .get("/api/todos/")
        .then((res) => this.setState({ todoList: res.data }))
        .catch((err) => console.log(err));
    };
  
    toggle = () => {
      this.setState({ modal: !this.state.modal });
    };
  
    handleSubmit = (item) => {
      this.toggle();
  
      if (item.id) {
        axios
          .put(`/api/todos/${item.id}/`, item)
          .then((res) => this.refreshList());
        return;
      }
      axios
        .post("/api/todos/", item)
        .then((res) => this.refreshList());
    };
  
    handleDelete = (item) => {
      axios
        .delete(`/api/todos/${item.id}/`)
        .then((res) => this.refreshList());
    };
  */
