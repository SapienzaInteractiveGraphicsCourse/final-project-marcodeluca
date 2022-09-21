
import * as THREE from '../libs/three_js/three.module.js';
import { GLTFLoader } from '../libs/loaders/GLTFLoader.js';


class Human {
    HUMAN_MODEL_PATH = './src/models/human/scene.gltf';
    constructor(){
        this.gltfLoader = null;
        this.loadedData = null;
        this.scene = null;
        this.model = null;
        this.parts = {}
        this.colorableParts ={}
    }
    async load(){
        this.gltfLoader = new GLTFLoader();
        this.data_loaded = await this.gltfLoader.loadAsync(this.HUMAN_MODEL_PATH);
        this.scene = this.data_loaded.scene;        
        this.model = this.scene.getObjectByName("MikeAlger").children[0];
        this.model.traverse( function( object ) {
            object.frustumCulled = false;
        } );
        this.model.scale.set(2.5,2.5,2.5)
        this.model.position.set(30,0,0)
        
    }
    init(){
        this.parts.hips = this.model.getObjectByName("mixamorig_Hips_01")
        this.parts.spine = this.model.getObjectByName("mixamorig_Spine_02")
        this.parts.spine1 = this.model.getObjectByName("mixamorig_Spine1_03")
        this.parts.spine2 = this.model.getObjectByName("mixamorig_Spine2_04")
        this.parts.neck = this.model.getObjectByName("mixamorig_Neck_05")
        this.parts.head = this.model.getObjectByName("mixamorig_Head_06")
        this.parts.eyeR = this.model.getObjectByName("mixamorig_RightEye_08")
        this.parts.eyeL = this.model.getObjectByName("mixamorig_LeftEye_09")

        this.parts.shoulderL = this.model.getObjectByName("mixamorig_LeftShoulder_010")
        this.parts.armL = this.model.getObjectByName("mixamorig_LeftArm_011")
        this.parts.foreArmL = this.model.getObjectByName("mixamorig_LeftForeArm_012")
        this.parts.handL = this.model.getObjectByName("mixamorig_LeftHand_013")
        this.parts.middleL1 = this.model.getObjectByName("mixamorig_LeftHandMiddle1_014")
        this.parts.middleL2 = this.model.getObjectByName("mixamorig_LeftHandMiddle2_015")
        this.parts.middleL3 = this.model.getObjectByName("mixamorig_LeftHandMiddle3_016")
        this.parts.thumbL1 = this.model.getObjectByName("mixamorig_LeftHandThumb1_018")
        this.parts.thumbL2 = this.model.getObjectByName("mixamorig_LeftHandThumb2_019")
        this.parts.thumbL3 = this.model.getObjectByName("mixamorig_LeftHandThumb3_020")
        this.parts.indexL1 = this.model.getObjectByName("mixamorig_LeftHandIndex1_022")
        this.parts.indexL2 = this.model.getObjectByName("mixamorig_LeftHandIndex2_023")
        this.parts.indexL3 = this.model.getObjectByName("mixamorig_LeftHandIndex3_024")
        this.parts.ringL1 = this.model.getObjectByName("mixamorig_LeftHandRing1_026")
        this.parts.ringL2 = this.model.getObjectByName("mixamorig_LeftHandRing2_027")
        this.parts.ringL3 = this.model.getObjectByName("mixamorig_LeftHandRing3_028")
        this.parts.pinkyL1 = this.model.getObjectByName("mixamorig_LeftHandPinky1_030")
        this.parts.pinkyL2 = this.model.getObjectByName("mixamorig_LeftHandPinky2_031")
        this.parts.pinkyL3 = this.model.getObjectByName("mixamorig_LeftHandPinky3_032")

        this.parts.shoulderR = this.model.getObjectByName("mixamorig_RightShoulder_034")
        this.parts.armR = this.model.getObjectByName("mixamorig_RightArm_035")
        this.parts.foreArmR = this.model.getObjectByName("mixamorig_RightForeArm_036")
        this.parts.handR = this.model.getObjectByName("mixamorig_RightHand_037")
        this.parts.middleR1 = this.model.getObjectByName("mixamorig_RightHandMiddle1_038")
        this.parts.middleR2 = this.model.getObjectByName("mixamorig_RightHandMiddle2_039")
        this.parts.middleR3 = this.model.getObjectByName("mixamorig_RightHandMiddle3_040")
        this.parts.thumbR1 = this.model.getObjectByName("mixamorig_RightHandThumb1_042")
        this.parts.thumbR2 = this.model.getObjectByName("mixamorig_RightHandThumb2_043")
        this.parts.thumbR3 = this.model.getObjectByName("mixamorig_RightHandThumb3_044")
        this.parts.indexR1 = this.model.getObjectByName("mixamorig_RightHandIndex1_046")
        this.parts.indexR2 = this.model.getObjectByName("mixamorig_RightHandIndex2_047")
        this.parts.indexR3 = this.model.getObjectByName("mixamorig_RightHandIndex3_048")
        this.parts.ringR1 = this.model.getObjectByName("mixamorig_RightHandRing1_050")
        this.parts.ringR2 = this.model.getObjectByName("mixamorig_RightHandRing2_051")
        this.parts.ringR3 = this.model.getObjectByName("mixamorig_RightHandRing3_052")
        this.parts.pinkyR1 = this.model.getObjectByName("mixamorig_RightHandPinky1_054")
        this.parts.pinkyR2 = this.model.getObjectByName("mixamorig_RightHandPinky2_055")
        this.parts.pinkyR3 = this.model.getObjectByName("mixamorig_RightHandPinky3_056")

        this.parts.upLegR = this.model.getObjectByName("mixamorig_RightUpLeg_058")
        this.parts.legR = this.model.getObjectByName("mixamorig_RightLeg_00")
        this.parts.footR = this.model.getObjectByName("mixamorig_RightFoot_059")
        this.parts.toeR = this.model.getObjectByName("mixamorig_RightToeBase_060")
        this.parts.upLegL = this.model.getObjectByName("mixamorig_LeftUpLeg_062")
        this.parts.legL = this.model.getObjectByName("mixamorig_LeftLeg_063")
        this.parts.footL = this.model.getObjectByName("mixamorig_LeftFoot_064")
        this.parts.toeL = this.model.getObjectByName("mixamorig_LeftToeBase_065")

        this.colorableParts.skin=this.model.getObjectByName("Object_7").material //.material.color.set(0x0000FF)
        this.colorableParts.bracelet=this.model.getObjectByName("Object_9").material
        this.colorableParts.jacket=this.model.getObjectByName("Object_11").material
        this.colorableParts.pants=this.model.getObjectByName("Object_13").material
        this.colorableParts.hair=this.model.getObjectByName("Object_15").material
        this.colorableParts.shirt=this.model.getObjectByName("Object_17").material
        this.colorableParts.shoes=this.model.getObjectByName("Object_19").material
        for (let i = 0; i < Object.keys(this.parts).length; i++){
            let part = this.parts[Object.keys(this.parts)[i]];
            if(part.rotation.x<0){
                part.rotation.set(6.28+part.rotation.x,part.rotation.y,part.rotation.z)
            }
            if(part.rotation.y<0){
                part.rotation.set(part.rotation.x,6.28+part.rotation.y,part.rotation.z)
            }
            if(part.rotation.z<0){
                part.rotation.set(part.rotation.x,part.rotation.y,6.28+part.rotation.z)
            }
        }
    }
}

export {Human};