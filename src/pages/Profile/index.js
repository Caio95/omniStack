import React, { useState, useEffect } from 'react';
import { FiPower, FiTrash2, FiTrash } from 'react-icons/fi';
import LogoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import './style.css';
import api from '../../services/api';

export default function Profile(){
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    useEffect(() =>{
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(res =>{
            setIncidents(res.data);
        })
    },[ongId]);

    async function handleDeleteincident(id){
          try {
             await api.delete(`incidents/${id}`, {
                 headers: {
                     Authorization: ongId,
                 }
             });

             setIncidents(incidents.filter(incident => incident.id != id));
          }   catch (err){
              alert('Erro ao deletar caso, tente novamente');
          }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return <div className="profile-container">
        <header>
            <img src={LogoImg} alt="Be THe Hro"/>
            <span>Bem vinda, {ongName}</span>

            <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
            <button type="button" onClick={handleLogout}> <FiPower size={18} color="#E02041"/></button>
        </header>
        <h1>Casos Cadastrados</h1>
        <ul>
            {incidents.map(incident =>(
                    <li key={incident.id}>
                        <strong>Caso:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-br', {style: 'currency', currency:'BRL'}).format(incident.value)}</p>

                        <button type="button" onClick={()=> handleDeleteincident(incident.id)}><FiTrash2 size={20} color="#a8a8b3"/></button>
                    </li>
                )) }
        </ul>
    </div>
}