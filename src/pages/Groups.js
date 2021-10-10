import React, { useEffect } from "react";
import Collapsible from "react-collapsible";
import CustomizedDialogs from "../components/Dialog";
import "../css/Groups.css";
import { GroupsAPI } from "../apis/groupsApi";

const BASE_URL = "https://team-69-backend.herokuapp.com/crm/";

export default class Groups extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            isLoaded: false,
            searchTerm: "",
        };
    }

    setSearchTerm = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    componentDidMount = async () => {
        const groups = await GroupsAPI.getGroups();
        console.log(groups);
        this.setState({
            groups: groups,
            isLoaded: true,
        });
    };

    render() {
        if (!this.state.isLoaded) {
            return <div>Loading...</div>;
        }
        return (
            <div>
                <input
                    type="text"
                    name="searchTerm"
                    placeholder="Search..."
                    onChange={this.setSearchTerm}
                />
                {this.state.groups.map((group) => (
                    <div>
                        <div className="padded title">{group.name}</div>
                        <Collapsible
                            triggerClassName="padded"
                            trigger="Expand"
                            triggerOpenedClassName="padded"
                            triggerWhenOpen="Collapse"
                            open={true}
                        >
                            <div className="topContainer">
                                {group.contactObjects
                                    .filter((contact) => {
                                        if (this.state.searchTerm === "")
                                            return contact;
                                        else if (
                                            contact.firstName
                                                .toLowerCase()
                                                .includes(
                                                    this.state.searchTerm.toLowerCase()
                                                )
                                        )
                                            return contact;
                                    })
                                    .map((contact, key) => {
                                        return (
                                            <div className="user" key={key}>
                                                <ContactCard
                                                    firstName={
                                                        contact.firstName
                                                    }
                                                    lastName={contact.lastName}
                                                />
                                            </div>
                                        );
                                    })}
                                <AddCard />
                            </div>
                        </Collapsible>
                    </div>
                ))}
            </div>
        );
    }
}

// export default function Groups() {
//     const [searchTerm, setSearchTerm] = useState('')
//     const [contacts, setContacts] = useState([]);

//     useEffect(() => {
//         getContacts();

//         async function getContacts(user){
//             const requestOptions = {
//                 method: "GET",
//                 headers: {
//                     Accept: "application/json",
//                     "Content-Type": "application/json",
//                     'Authorization': `Basic ` + btoa(sessionStorage.getItem("username") + ':' + sessionStorage.getItem("password"))
//                 },
//                 mode: "cors",
//             };
//             const response = await fetch(BASE_URL + "contacts/", requestOptions);
//             const data = await response.json();
//             console.log(data);

//             setContacts(data);
//         }
//     }, []);

//     return (
//         <div>
//             <input type="text" placeholder="Search..." onChange={event => {setSearchTerm(event.target.value)}}/>

//             <div class="padded title">
//                 IT Project
//             </div>

//             <Collapsible triggerClassName="padded" trigger="Expand" triggerOpenedClassName="padded" triggerWhenOpen="Collapse" open= {true} >

//             <div class="topContainer">
//                 {JSONDATA.filter((val)=> {
//                     if (searchTerm == "") {
//                         return val
//                     } else if (val.firstName.toLowerCase().includes(searchTerm.toLowerCase())) {
//                         return val
//                     }
//                 }).map((val, key) => {
//                     return (
//                         <div className="user" key={key}>
//                             <ContactCard name = {val.firstName}/>
//                         </div>
//                     );
//                 })}

//                 <AddCard name = "Leon Sterling"/>

//             </div>

//             </Collapsible>

//             <div class="padded title">
//                 Real Estate
//             </div>

//             <Collapsible triggerClassName="padded" trigger="Expand" triggerOpenedClassName="padded" triggerWhenOpen="Collapse" open= {true} >

//             <div class="topContainer">
//                 {JSONDATA.filter((val)=> {
//                     if (searchTerm == "") {
//                         return val
//                     } else if (val.firstName.toLowerCase().includes(searchTerm.toLowerCase())) {
//                         return val
//                     }
//                 }).map((val, key) => {
//                     return (
//                         <div className="user" key={key}>
//                             <ContactCard name = {val.firstName}/>
//                         </div>
//                     );
//                 })}

//                 <AddCard name = "Leon Sterling"/>

//             </div>
//             </Collapsible>

//         </div>
//     )
// }

// function AddContact(props) {
//     return (
//         <div className="rcorners">

//         </div>
//     )
// }

function ContactCard(props) {
    return (
        <div class="rcorners">
            <div class="topContainer top">
                <div class="dot">
                    <div class="centeredInDot">LS</div>
                </div>
                <div class="padded">
                    {props.firstName} {props.lastName}
                </div>
            </div>
            <div class="subText topContainer space">
                <div class="padded3"> Title </div>
                <div class="padded2"> it project subject coordinator </div>
            </div>
        </div>
    );
}

function AddCard(props) {
    return (
        <div class="rcorners lb100">
            <div class="center iris60">
                <CustomizedDialogs />
            </div>
        </div>
    );
}
