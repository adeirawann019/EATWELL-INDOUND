// EATWELL V19 - OTAK UTAMA - Semua Data Nyambung
// Rumus: Stok Akhir = Stok Awal + IN - OUT + Retur
function loadV19(){let d=JSON.parse(localStorage.getItem('eatwell_v19')||'null');if(!d){d={master:[],pinjam:[],users:[],perintah:"",assembly:[],assemblyDetail:{},riwayat:[]};localStorage.setItem('eatwell_v19',JSON.stringify(d))}return d}
function saveV19(d){localStorage.setItem('eatwell_v19',JSON.stringify(d))}
function stokAkhirV19(m){return m.so+m.in-m.out+m.retur}
function cariBarangV19(nama){let d=loadV19();return d.master.find(x=>x.nama.toLowerCase().includes(nama.toLowerCase()))}
function tambahIN_V19(nama,qty,oleh){let d=loadV19();let a=cariBarangV19(nama);if(!a){a={nama:nama.toUpperCase(),kode:'CKDS-'+Date.now(),brand:'CKDS',kat:'',sat:'KG',so:0,in:0,out:0,retur:0};d.master.push(a)}a.in+=qty;d.riwayat.push(`[${new Date().toLocaleTimeString('id-ID')} ] IN ${a.nama} ${qty} oleh ${oleh||'Inbound'}`);saveV19(d);return a}
function tambahOUT_V19(nama,qty,oleh){let d=loadV19();let a=cariBarangV19(nama);if(a){a.out+=qty;d.riwayat.push(`[${new Date().toLocaleTimeString('id-ID')}] OUT ${a.nama} ${qty} oleh ${oleh||'Inbound'}`);saveV19(d)}return a}
function tambahRetur_V19(nama,qty,alasan){let d=loadV19();let a=cariBarangV19(nama);if(a){a.retur+=qty;d.riwayat.push(`[${new Date().toLocaleTimeString('id-ID')}] RETUR ${a.nama} ${qty} - ${alasan||'Tidak jadi produksi'}`);saveV19(d)}return a}
function kirimPerintah_V19(teks){let d=loadV19();d.perintah=teks;saveV19(d)}
function ajukanPinjam_V19(teks){let d=loadV19();d.pinjam.push({teks,status:'Menunggu Disetujui'});saveV19(d)}
function setPinjam_V19(i,status){let d=loadV19();d.pinjam[i].status=status;d.riwayat.push(`[${new Date().toLocaleTimeString('id-ID')}] ATASAN ${status} pinjam: ${d.pinjam[i].teks}`);saveV19(d)}
function simpanAssembly_V19(naik,tidakNaik){let d=loadV19();d.assembly.push({nama:'Assembly - '+new Date().toLocaleDateString('id-ID')+' - NAIK '+naik+' / TIDAK NAIK '+tidakNaik,status:'Selesai ✅'});saveV19(d)}
function laporanV19(){let d=loadV19();return {totalMaster:d.master.length,stokAwal:d.master.reduce((a,b)=>a+b.so,0),totalIN:d.master.reduce((a,b)=>a+b.in,0),totalOUT:d.master.reduce((a,b)=>a+b.out,0),totalRetur:d.master.reduce((a,b)=>a+b.retur,0),stokAkhir:d.master.reduce((a,b)=>a+stokAkhirV19(b),0),pinjam:d.pinjam,assembly:d.assembly,perintah:d.perintah}}
console.log('EATWELL V19 - app.js aktif! Data nyambung semua dashboard!');
