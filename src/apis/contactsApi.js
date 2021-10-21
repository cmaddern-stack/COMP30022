import { useState, useEffect } from "react";
import axios from "axios";

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
        return response.json();
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
