import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from "../../src/helpers/fileUpload"

cloudinary.config({
    cloud_name: 'ddoiryakd',
    api_key: '143259852486731',
    api_secret: 'HknudRsYD75Sk2q6zH5NElazM-c',
    secure: true
});

describe('Pruebas en fileUpload', () => {
    test('debe de subir el archivo correctamente a cloudinary',async()=>{

        const imageUrl = 'https://plus.unsplash.com/premium_photo-1673306778968-5aab577a7365?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29sb21iaWF8ZW58MHx8MHx8fDA%3D';

        const resp =await fetch(imageUrl);
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg');

        const url= await fileUpload(file);
        expect(typeof url).toBe('string');
        
        //console.log(url)
        const segmentos =url.split('/');
        //console.log(segmentos) -9 elementos
        const imageId= segmentos[segmentos.length -1].replace('.jpg','');
        //console.log({imageId}) -elemento 8

        const  cloudResp = await cloudinary.api.delete_resources(['journal/'+imageId]);
        //console.log(cloudResp )
    })

    test('debe de retornar null',async () =>{
        const file = new File([], 'foto.jpg');

        const url= await fileUpload(file);
        expect(url).toBe(null);
    })

 })