<?php

namespace App\Http\Controllers;

use App\Models\Mahasiswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class MahasiswaController extends Controller
{
    public function get(){
        return Mahasiswa::all();
    }

    public function post(Request $request){
        $this->validate($request, [
            'foto' => 'required | mimes:jpg,png,gif,PNG,JPEG,JPG,SVG,GIF'
        ]);
        $foto = $request->file('foto');
        $namaFoto = time().$foto->getClientOriginalName();
        $foto->move(('foto'), $namaFoto);

        return Mahasiswa::create([
            'nama' => $request->nama,
            'npm' => $request->npm,
            'email' => $request->email,
            'jurusan' => $request->jurusan,
            'foto' => $namaFoto,
        ]);
    }

    public function put(Request $request) {
        $foto = $request->file('foto');
        if($foto != null){
            $this->validate($request, [
                'foto' => 'required | mimes:jpg,png,gif,PNG,JPEG,JPG,SVG,GIF'
            ]);
            $foto = $request->file('foto');
            $namaFoto = time().$foto->getClientOriginalName();
            $foto->move(('foto'), $namaFoto);

            return Mahasiswa::where('id', $request->id)->update([
                'nama' => $request->nama,
                'npm' => $request->npm,
                'email' => $request->email,
                'jurusan' => $request->jurusan,
                'foto' => $namaFoto,
            ]);
            File::delete('foto/'.$request->fotolama);
        } else {
            return Mahasiswa::where('id', $request->id)->update([
                'nama' => $request->nama,
                'npm' => $request->npm,
                'email' => $request->email,
                'jurusan' => $request->jurusan,
            ]);
        }
    }

    public function delete(Request $request){
        return Mahasiswa::where('id', $request->id)->delete();
        File::delete('foto/'.$request->fotolama);
    }
}
