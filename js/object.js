import * as THREE from 'three'

class Object {
    constructor(radius, color, transparency, emissive, position, velocity, mass) {
        const geometry = new THREE.SphereGeometry( radius, 32, 16);
        this.emissive = emissive
        const material = new THREE.MeshLambertMaterial({ color: color, opacity: true, transparent: transparency, emissive: emissive, });
        const sphere = new THREE.Mesh( geometry, material);
        this.sphere = sphere;  
        this.timeStep = 0.1
        this.gravitationalConstant = 3
        this.position = position
        this.velocity = velocity    
        this.mass = mass
        if (!this.emissive === false) {
            this.light = new THREE.PointLight( 0xffffff, 5, 100 );
        }

    }
    updateObjectPosition(objects) {
        let acceleration = this.netForce(objects).multiplyScalar(1 / this.mass);
        this.velocity.add(acceleration.multiplyScalar(this.timeStep))
        let velocity = this.velocity.clone() 
        this.position.add(velocity.multiplyScalar(this.timeStep));
        this.sphere.position.set(this.position.x, this.position.y, this.position.z);
        if (!this.emissive === false) {
            this.light.position.set(this.position.x, this.position.y, this.position.z)
        }
    }
    TwoBodyForce(otherObject) {
        if (this === otherObject) {
            return new THREE.Vector3(0, 0, 0)
        } else {
            let otherPosition = otherObject.position.clone()
            let vector = otherPosition.sub(this.position)
            let distance = vector.length()
            let direction = vector.normalize()
            return direction.multiplyScalar(otherObject.mass * this.mass * this.gravitationalConstant / (distance**2))
        }  
    }
    netForce(objects) {
        let netForce = new THREE.Vector3(0, 0, 0)
        for (let object of objects) {
            netForce.add(this.TwoBodyForce(object))
        }
        return netForce
    }
}

export {Object}