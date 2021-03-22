export default class Primitive {
    constructor(){

        this.minpos = 0;
        this.maxpos = 5;
        this.min_len = 1;
        this.max_len = 5;

        this.x = Math.floor(Math.random() * (this.maxpos - this.minpos + 1) ) + this.minpos;
        this.y = Math.floor(Math.random() * (this.maxpos - this.minpos + 1) ) + this.minpos;
        this.z = Math.floor(Math.random() * (this.maxpos - this.minpos + 1) ) + this.minpos;

        this.height = Math.floor(Math.random() * (this.max_len - this.min_len + 1) ) + this.min_len;
        this.width = Math.floor(Math.random() * (this.max_len - this.min_len + 1) ) + this.min_len;
        this.depth = Math.floor(Math.random() * (this.max_len - this.min_len + 1) ) + this.min_len;

        this.max_x = this.x + (this.width/2);
        this.min_x = this.x - (this.width/2);
        this.max_y = this.y + (this.height/2);
        this.min_y = this.y - (this.height/2);
        this.max_z = this.z + (this.depth/2);
        this.min_z = this.z - (this.depth/2);

        this.p1 = new THREE.Vector3(this.min_x,this.max_y,this.max_z);
        this.p2 = new THREE.Vector3(this.min_x,this.min_y,this.max_z);
        this.p3 = new THREE.Vector3(this.max_x,this.min_y,this.max_z);
        this.p4 = new THREE.Vector3(this.max_x,this.max_y,this.max_z); 
        this.p5 = new THREE.Vector3(this.max_x,this.max_y,this.min_z);
        this.p6 = new THREE.Vector3(this.max_x,this.min_y,this.min_z);
        this.p7 = new THREE.Vector3(this.min_x,this.min_y,this.min_z);
        this.p8 = new THREE.Vector3(this.min_x,this.max_y,this.min_z);

        this.points = [this.p1,this.p2,this.p3,this.p4,this.p5,this.p6,this.p7,this.p8];

        this.side_max_x = [this.p3,this.p4,this.p5,this.p6];
        this.side_min_x = [this.p1,this.p2,this.p7,this.p8];
        
        this.side_max_y = [this.p1,this.p4,this.p5,this.p8];
        this.side_min_y = [this.p2,this.p3,this.p6,this.p7];

        this.side_max_z = [this.p1,this.p2,this.p3,this.p4];
        this.side_min_z = [this.p5,this.p6,this.p7,this.p8];
        
        this.center = new THREE.Vector3(this.x,this.y,this.z);
    }
    clone(){
        var P1 = new Primitive();
        P1.x = this.x
        P1.y = this.y
        P1.z = this.z

        P1.width = this.width
        P1.height = this.height
        P1.depth = this.depth

        P1.update()
        return P1
    }
    update(){

        this.x = Number(this.x.toFixed(2));
        this.y = Number(this.y.toFixed(2));
        this.z = Number(this.z.toFixed(2));
        
        this.height = Number(this.height.toFixed(2));
        this.width = Number(this.width.toFixed(2));
        this.depth = Number(this.depth.toFixed(2));

        this.max_x = Number((this.x + (this.width/2)).toFixed(2));
        this.min_x = Number((this.x - (this.width/2)).toFixed(2));
        this.max_y = Number((this.y + (this.height/2)).toFixed(2));
        this.min_y = Number((this.y - (this.height/2)).toFixed(2));
        this.max_z = Number((this.z + (this.depth/2)).toFixed(2));
        this.min_z = Number((this.z - (this.depth/2)).toFixed(2));

        this.p1 = new THREE.Vector3(this.min_x,this.max_y,this.max_z);
        this.p2 = new THREE.Vector3(this.min_x,this.min_y,this.max_z);
        this.p3 = new THREE.Vector3(this.max_x,this.min_y,this.max_z);
        this.p4 = new THREE.Vector3(this.max_x,this.max_y,this.max_z); 
        this.p5 = new THREE.Vector3(this.max_x,this.max_y,this.min_z);
        this.p6 = new THREE.Vector3(this.max_x,this.min_y,this.min_z);
        this.p7 = new THREE.Vector3(this.min_x,this.min_y,this.min_z);
        this.p8 = new THREE.Vector3(this.min_x,this.max_y,this.min_z);

        this.points = [this.p1,this.p2,this.p3,this.p4,this.p5,this.p6,this.p7,this.p8];

        this.side_max_x = [this.p3,this.p4,this.p5,this.p6];
        this.side_min_x = [this.p1,this.p2,this.p7,this.p8];
        
        this.side_max_y = [this.p1,this.p4,this.p5,this.p8];
        this.side_min_y = [this.p2,this.p3,this.p6,this.p7];

        this.side_max_z = [this.p1,this.p2,this.p3,this.p4];
        this.side_min_z = [this.p5,this.p6,this.p7,this.p8];
 
        this.center = new THREE.Vector3(this.x,this.y,this.z);
        this.genotype = 0;
    }
    delete(scene){
        scene.remove(this.genotype)
    }
    draw(scene){
        var geometry = new THREE.BoxGeometry(this.width,this.height,this.depth);
        var color = random_rgba();
        var material = new THREE.MeshBasicMaterial( {color: color , wireframe: false} );
        this.genotype = new THREE.Mesh(geometry,material);
        this.genotype.position.set(this.x,this.y,this.z);
        geometry.verticesNeedUpdate = true;
        scene.add(this.genotype)
    }

    get_mass(){
        var Volume = this.width*this.height*this.depth*20*20*20;
        return Volume * 0.71;
    }

    get_extents(){
        extents = [this.min_x,this.max_x,this.min_y,this.max_y,this.min_z,this.max_z];
        return extents;
    }
    
}

var random_rgba = () => {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ')';
}