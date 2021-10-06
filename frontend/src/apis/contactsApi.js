import { useState, useEffect } from 'react';
import axios from 'axios';

// Getting list of ALL contacts
export async function getContacts() {
    return axios.get("/crm/contacts/").then(res => res.data);
}

export function useContacts() {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        getContacts()
            .then(items => {
                setItems(items);
                setLoading(false);
        })
        .catch(e => {
            setError(e);
            setLoading(false);
        });
    }, []);
    
    return {
        loading, 
        items,
        error,
    }
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