import { useEffect, useState } from 'react'
import './Table.css'
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';



let id = 0;
const generateId = () => ++id;

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(JSON.parse(localStorage.data));
  }, []);

  function save() {
    localStorage.data = JSON.stringify(data);
  }

  function appendTodo(ad, soyad, ePosta, dogumTarihi) {
    const todoObj = {
      id: generateId(),
      ad,
      soyad,
      ePosta,
      dogumTarihi
    }
    setData([...data, todoObj]);
  }

  function updateRecord(record) {
    let foundRecord = data.find(x => x.id === record.id);
    // referansı bozmamak için object assign kullanıyoruz
    // eğer referansı kırarsak bu sefer gösterim sırası bozulur
    // eğer bu notları çözemezseniz referansı kırıp arayüzde probleme odaklanın
    Object.assign(foundRecord, record);
    setData([...data]);
    save();
  }

  function deleteRecord(id) {
    if (!confirm('Emin misiniz?')) { return; }

    setData(data.filter(x => x.id !== id));
    save();
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div className='container'>
      <React.Fragment>
        <h1>Öğrenci bilgi sistemi</h1>
        <Button variant="outlined" onClick={handleClickOpen}>
          Yeni
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
        >
          <TodoForm appendTodo={appendTodo} />
          <Button onClick={handleClose}>
            kapat
          </Button>
        </Dialog>
      </React.Fragment>
      <div className="studentTable">
        <ul className="studentTableTitles">
          <li>Ad</li>
          <li>Soyad</li>
          <li>E-Posta Adresi</li>
          <li>Doğum Tarihi</li>
          <li>#</li>
        </ul>
        {data.map(x => <StudentRow key={x.id} {...x} deleteRecord={deleteRecord} updateRecord={updateRecord} />)}
      </div>
    </div>
  )
}

function StudentRow({ id, ad, soyad, ePosta, dogumTarihi, updateRecord, deleteRecord }) {
  const [isEditing, setEditing] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);
    formObj.id = id;
    updateRecord(formObj);
    setEditing(false);
  }

  return (
    <form onSubmit={handleSubmit} onDoubleClick={() => setEditing(true)}>
      {isEditing ?
        <>
          <div className="studentTableCol">
            <input type="text" required name='ad' defaultValue={ad} />
          </div>
          <div className="studentTableCol">
            <input type="text" required name='soyad' defaultValue={soyad} />
          </div>
          <div className="studentTableCol">
            <input type="email" required name='ePosta' defaultValue={ePosta} />
          </div>
          <div className="studentTableCol">
            <input type="date" required name='dogumTarihi' defaultValue={dogumTarihi} />
          </div>
          <div className="studentTableCol">
            <button type='button' onClick={() => setEditing(false)}>vazgeç</button>
            <button className='saveBtn' type='submit'>kaydet</button>
          </div>
        </>
        :
        <>
          <div className="studentTableCol">{ad}</div>
          <div className="studentTableCol">{soyad}</div>
          <div className="studentTableCol">{ePosta}</div>
          <div className="studentTableCol">{dogumTarihi.split('-').reverse().join('.')}</div>
          <div className="studentTableCol">
            <button type='button' onClick={() => setEditing(true)}>düzenle</button>
            <button className='delBtn' type='button' onClick={() => deleteRecord(id)}>sil</button>
          </div>
        </>
      }
    </form>
  )
}

function TodoForm({ appendTodo }) {
  function handeleSubmit(e) {
    e.preventDefault();
    appendTodo(e.target['ad'].value, e.target['soyad'].value, e.target['ePosta'].value, e.target['dogumTarihi'].value);
    e.target.reset();
  }


  return (
    <form className='ekleme' onSubmit={handeleSubmit}>
      <input name='ad' required type="text" placeholder='ad' />
      <input name='soyad' required type="text" placeholder='soyad' />
      <input name='ePosta' required type="email" placeholder='ePosta' />
      <input name='dogumTarihi' required type="date" placeholder='dogumTarihi' />
      <button variant="outlined">Ekle</button>
    </form>
  )
}

export default App
