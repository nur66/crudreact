import axios from 'axios'
import { Form, Modal, Table } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'

const Home = () => {

    const [booleanTambah, setBooleanTambah] = useState(false)
    const [booleanUbah, setBooleanUbah] = useState(false)
    const [booleanHapus, setBooleanHapus] = useState(false)

    // Membuat variabel
    const [nama, setNama] = useState('')
    const [npm, setNpm] = useState('')
    const [email, setEmail] = useState('')
    const [jurusan, setJurusan] = useState('')
    const [foto, setFoto] = useState(null)
    const [gambar, setGambar] = useState('')
    const [id, setId] = useState(null)
    
    
    const [mahasiswa, setMahasiswa] = useState([])
    const getMahasiswa = async()=>{
        try {
            let res = await axios.get('/api/mahasiswa')
            setMahasiswa(res.data)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(()=>{
        getMahasiswa()
    }, [])

    // Untuk balik ke default/  awal
    const bersih = ()=> {
        setBooleanTambah(false)
        setBooleanUbah(false)
        setBooleanHapus(false)
        setNama('')
        setNpm('')
        setEmail('')
        setJurusan('')
        setFoto(null)
        setGambar('')
        setId(null)
    }


    return (
        <div className="container">
            <h1>Tabel Mahasiswa</h1>
            <button type="submit" className="btn btn-primary mb-2" onClick={()=>{
                setBooleanTambah(true)
            }}>Tambah</button>

            <Table bordered className="pt-2">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Nama</th>
                        <th scope="col">Npm</th>
                        <th scope="col">Email</th>
                        <th scope="col">Jurusan</th>
                        <th scope="col">Foto</th>
                        <th scope="col">Pilihan</th>
                    </tr>
                </thead>
                <tbody>
                    {mahasiswa.map((siswa, i)=>(
                        <tr key={i}>
                            <td>{i+1}</td>
                            <td>{siswa.nama}</td>
                            <td>{siswa.npm}</td>
                            <td>{siswa.email}</td>
                            <td>{siswa.jurusan}</td>
                            <td>
                                <img src={`/foto/${siswa.foto}`} className="foto" />
                            </td>
                            <td>
                                <button className="btn btn-success" onClick={()=>{
                                    setBooleanUbah(true)
                                    setId(siswa.id)
                                    setNama(siswa.nama)
                                    setNpm(siswa.npm)
                                    setEmail(siswa.email)
                                    setJurusan(siswa.jurusan)
                                    setGambar(siswa.foto)
                                }}>Ubah</button> &nbsp;    
                                <button className="btn btn-danger" onClick={()=>{
                                    console.log(siswa.id);
                                    setBooleanHapus(true)
                                    setId(siswa.id)
                                    setGambar(siswa.foto)
                                }}>Hapus</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            
            {/* Modal Tambah Mahasiswa */}
            <Modal show={booleanTambah} onHide={()=>{
                bersih()
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Mahasiswa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Nama</Form.Label>
                        <Form.Control placeholder="Nama..." onChange={(e)=>{
                            setNama(e.target.value)
                        }}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Npm</Form.Label>
                        <Form.Control placeholder="Npm..." onChange={(e)=>{
                            setNpm(e.target.value)
                        }}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control placeholder="Email..." onChange={(e)=>{
                            setEmail(e.target.value)
                        }}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Jurusan</Form.Label>
                        <select className="form-control" onChange={(e)=>{
                            setJurusan(e.target.value)
                        }}>
                            <option value="">Pilih</option>
                            <option value="Teknik Informatika">Teknik Informatika</option>
                            <option value="Teknik Industri">Teknik Industri</option>
                        </select>
                        <br></br>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Foto</Form.Label>
                        <input type="file" name="foto" id="" accept="image/*" onChange={(e)=>{
                            setFoto(e.target.files[0])
                        }} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-success" onClick={()=>{
                        const fdata = new FormData()
                        fdata.append('foto',foto)
                        fdata.append('nama',nama)
                        fdata.append('npm',npm)
                        fdata.append('email', email)
                        fdata.append('jurusan',jurusan)

                        try{
                            axios.post('/api/mahasiswa', fdata).then(()=>{
                                bersih();
                                getMahasiswa();
                            })
                        } catch(error){
                            console.log(error.message)
                        }

                    }}>Simpan</button>
                    <button className="btn btn-danger" onClick={()=>{
                        bersih()
                    }}>Batal</button>
                </Modal.Footer>
            </Modal> 

               {/* Modal Ubah */}
            <Modal show={booleanUbah} onHide={()=>{
                bersih()
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Ubah Data Mahasiswa</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Nama</Form.Label>
                        <Form.Control defaultValue={nama} onChange={(e)=>{
                            setNama(e.target.value)
                        }} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Npm</Form.Label>
                        <Form.Control defaultValue={npm} onChange={(e)=>{
                            setNpm(e.target.value)
                        }} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control defaultValue={email} onChange={(e)=>{
                            setEmail(e.target.value)
                        }} />
                    </Form.Group>
                    <Form.Group>
                        <select name="jurusan" id="jurusan">
                            <option value={jurusan}>{jurusan}</option>
                            <option value="Teknik Informatika">Teknik Informatika</option>
                            <option value="Teknik Industri">Teknik Industri</option>
                        </select>
                    </Form.Group>
                    <Form.Group>
                        <img src={`/foto/${gambar}`} alt="" className="foto" />
                        <br/>
                        <input type="file" accept="image/*" name="foto" id="foto" onChange={(e)=>{
                            setFoto(e.target.files[0])
                        }} />
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <button className="btn btn-success" onClick={()=>{
                        try {
                            const fdata = new FormData()
                                fdata.append('id', id)
                                fdata.append('nama', nama)
                                fdata.append('npm', npm)
                                fdata.append('email', email)
                                fdata.append('jurusan', jurusan)
                                fdata.append('fotolama', gambar)
                                if(foto !== null){
                                    fdata.append('foto', foto)
                                }
                                axios.post('/api/mahasiswa/ubah', fdata).then(()=>{
                                    bersih()
                                    getMahasiswa()
                                })
                        } catch (error) {
                            console.log(error.message);
                        }
                    }}>Simpan</button>
                    <button className="btn btn-danger" onClick={()=>{
                        bersih()
                    }}>Batal</button>
                </Modal.Footer>
            </Modal>

            {/* Modal Delete */}
            <Modal show={booleanHapus} onHide={()=>{
                bersih()
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Hapus Data Mahasiswa</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    <h4>Apakah anda setuju menghapus data mahasiswa ini?</h4>
                </Modal.Body>

                <Modal.Footer>
                    <button className="btn btn-success" onClick={()=>{
                        try {
                            const fdata = {
                                // id kiri untuk ke controller, id kanan dari constanta diatas
                                id : id,
                                fotolama : gambar
                            }
                            // sesuai router di api
                            axios.post('/api/mahasiswa/delete', fdata).then(()=>{
                                // setelah hapus apa yang dilakukan?
                                bersih()
                                getMahasiswa()
                            })
                        } catch (error) {
                            console.log(error.message);
                        }
                    }}>Setuju</button>
                    <button className="btn btn-danger" onClick={()=>{
                        bersih()
                    }}>Tidak setuju</button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default Home
