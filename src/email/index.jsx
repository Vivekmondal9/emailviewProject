// React Component
import React, { useEffect, useState } from 'react';
import "../email/index.css";
import axios from "axios";
import Loading from './Loading';
import { useNavigate } from 'react-router';
function Home() {
    const [selectedFilter, setSelectedFilter] = useState('');

    const handleFilterSelection = (filter) => {
        setSelectedFilter(filter);
    };

    const [allMails, setallMails] = useState([]);

    useEffect(() => {
        axios.get("https://flipkart-email-mock.vercel.app/")
            .then((response) => {
                setallMails(response.data.list)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])
    // console.log(allMails[0])

    const formatEmailDate = (timestamp) => {
        const date = new Date(timestamp);
        const options = { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: true 
        };
        return date.toLocaleDateString('en-US', options);
    };
    const nav=useNavigate();
    function showFullMail(i) {
        // var elements = document.getElementsByClassName("showemailbodty");
        // console.log(elements)
        // for (var j = 0; j < elements.length; j++) {
        //     elements[j].classList.toggle('cutshowmailbody');

        // }
        nav("/showfullmail")
        localStorage.setItem("emailid",i+1)

    }
 
    function goToHome(){
    window.location.reload()
    }
    
    return (
        <div className="mainBody">
            <div className="filterSec">
                <p onClick={()=>goToHome()}>Filter By:</p>
                <span style={{ display: 'flex', gap: '20px' }}>
                    <p
                        onClick={() => handleFilterSelection('Unread')}
                        className={selectedFilter === 'Unread' ? 'unread-filter' : ''}
                    >
                        Unread
                    </p>
                    <p
                        onClick={() => handleFilterSelection('Read')}
                        className={selectedFilter === 'Read' ? 'read-filter' : ''}
                    >
                        Read
                    </p>
                    <p
                        onClick={() => handleFilterSelection('Favourites')}
                        className={selectedFilter === 'Favourites' ? 'favourites-filter' : ''}
                    >
                        Favourites
                    </p>
                </span>

            </div>

            <div className='mailbody'>
                {allMails &&
                    allMails.map((p, i) => (

                        <div className='showemailbodty' id={i} onClick={()=>showFullMail(i)}>
                            <span className='left-span'>
                                <p className='tagname'>{p.from.name[0]}</p>
                            </span>
                            <span className='right-span'>
                                    <p>From: {p.from.name} , {p.from.email}</p>
                                    <p>Subject:  {p.subject}</p>
                                    <p>{p.short_description}</p>
                                    <p>Date: {formatEmailDate(p.date)}</p>
                            </span>

                        </div>
                    ))}
                    {!allMails &&
                (<div className="loading"><Loading></Loading></div>)}
            </div>
          

        </div>
    );
}


export default Home;