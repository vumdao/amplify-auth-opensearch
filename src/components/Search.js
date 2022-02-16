import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import SearchResult from './SearchResult';
import { localStore } from '../helper';

function onAutoLogout() {
    localStore.clear();
    window.location.reload();
}

const searchBar = {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    padding: '32px 16px 0'
};

const sesarchResultItem = {
    margin: "0 32px 16px",
    display: "flex",
    flexDirection: "column"
};


const Search = (props) => {
    const { signOut } = props;
    const [searchKey, setSearchKey] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const getData = async (key) => {
        try {
            let q = key;
            let params = { q };
            let accessToken = localStore.get('JWT_TOKEN')
            let res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}`, {
                params,
                headers: { "Authorization": `Bearer ${accessToken}`}
            });
            setData(res.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            onAutoLogout();
        }
    };

    const search = () => {
      if (searchKey) {
        setLoading(true);
        getData(searchKey);
      }
    }
    return (
        <div style={{ width: "100%" }}>
            <form style={searchBar} onSubmit={event => {
                event.preventDefault();
                search();
            }} noValidate autoComplete="off">
                <TextField value={searchKey} onChange={(event) => {
                  setSearchKey(event.target.value);
                }} id="outlined-basic" label="Movie Search" variant="outlined" style={{ width: '360px' }} />
                <Button variant="outlined" color="primary" style={{ marginLeft: "16px" }} onClick={() => {
                    setSearchKey('');
                    setData([]);
                }
                } >Clear</Button>
                <Button variant="outlined" color="secondary" style={{ marginLeft: "16px" }} onClick={signOut}>Sign Out</Button>
            </form>

            <div style={{ display: "flex", width: "100%", justifyContent: "center", marginTop: '32px' }}>
              {loading ? <p >loading...</p> : (<div style={{ display: "flex" }}>
              {data.length ? (
                  <div>
                    <p style={{ display: "flex", width: "100%", margin: "16px 32px 0", fontSize: "16px" }}>
                      <i>Found {data.length} item(s).</i>
                    </p>
                    <div style={sesarchResultItem}> {data.map((dataElement, idx) => {
                        return (
                            <SearchResult key={idx} dataElement={dataElement} />
                        );
                    })} </div>
                  </div>
              ) : <div><h3>No Records</h3></div>}
            </div>)}</div>
        </div>
    );
};



export default Search;
