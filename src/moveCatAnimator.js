import * as TWEEN from '../libs/tween.js/tween.esm.js';
import * as THREE from '../libs/three_js/three.module.js';

import { Cat } from './cat.js';
import { Utils } from './Utils.js'

class MoveCatAnimator {
    constructor(cat, environment) {

        this.cat = cat;
        this.utils = new Utils();
        this.environment = environment;
        this.tweenGroup;
        this.walkLConfiguration = {
            model: { x: 0, y: 0, z: 0, w: 1 },
            spine0: {
                x: 0.6816388
                , y: 0.0
                , z: 0.0
                , w: 0.7316889
            },

            tail0: {
                x: 0.9678639
                , y: 0.0
                , z: 0.0
                , w: -0.2514748

            },
            tail1: {
                x: 0.1494381
                , y: 0.0
                , z: 0.0
                , w: 0.9887711
            },
            tail2: {
                x: 0.1494381
                , y: 0.0
                , z: 0.0
                , w: 0.9887711

            },
            tail3: {
                x: 0.1494381
                , y: 0.0
                , z: 0.0
                , w: 0.9887711

            },
            tail4: {
                x: 0.0998334
                , y: 0.0
                , z: 0.0
                , w: 0.9950042
            },

            spine1: {
                x: 0.0
                , y: 0.0
                , z: 0.0
                , w: 1.0
            },
            spine2: {
                x: 0.0998334
                , y: 0
                , z: 0
                , w: 0.9950042
            },
            spine3: {
                x: 0.0499792
                , y: 0
                , z: 0
                , w: 0.9987503
            },
            spine4: {
                x: 0.1494381
                , y: 0
                , z: 0
                , w: 0.9887711
            },
            spine5: {
                x: 0.4498458
                , y: 0
                , z: 0
                , w: -0.8931063
            },
            spine6: {
                x: 0.14112
                , y: 0.0
                , z: 0.0
                , w: -0.9899925
            },

            face: {
                x: 0.381661
                , y: 0.0
                , z: 0.0
                , w: -0.9243024
            },

            breastC: {
                x: 0.0
                , y: 0.0
                , z: 0.0
                , w: 1.0
            },
            shoulderL: {
                x: -0.2039739
                , y: -0.9049074
                , z: -0.1640567
                , w: -0.3355931
            },
            upperarmL: {
                x: 0.3785603
                , y: -0.273528
                , z: -0.0056681
                , w: -0.8842185
            },
            forearmL: {
                x: 0.358794
                , y: 0.1162377
                , z: 0.0450843
                , w: 0.925053
            },
            handL: {
                x: 0.0
                , y: 0.0
                , z: 0.0
                , w: 1.0
            },
            f_toeL: {
                x: 0.2570806
                , y: 0.0
                , z: 0.0
                , w: 0.96639
            },
            shoulderR: {
                x: -0.2293134
                , y: 0.919146
                , z: 0.3202825
                , w: 0.0022812
            },
            upperarmR: {
                x: 0.7989795
                , y: 0.1783992
                , z: -0.04706
                , w: -0.5723555
            },
            forearmR: {
                x: 0.4576934
                , y: 0.0062178
                , z: 0.0425344
                , w: 0.8880703
            },
            handR: {
                x: -0.148941
                , y: -0.0121795
                , z: 0.080587
                , w: -0.9854816
            },
            f_toeR: {
                x: 0.6630758
                , y: 0.0258569
                , z: 0.0762032
                , w: 0.7442143
            },

            bellyC: {
                x: 0.6631354
                , y: 0.0
                , z: 0.0
                , w: 0.7484994
            },
            pelvisL: {
                x: -0.3843718
                , y: -0.0945456
                , z: -0.5097223
                , w: 0.7638735
            },
            thighL: {
                x: -0.5026259
                , y: 0.535529
                , z: 0.6385438
                , w: -0.2298645
            },
            shinL: {
                x: -0.3824423
                , y: -0.0250657
                , z: 0.048176
                , w: 0.9223821
            },
            footL: {
                x: 0.0848977
                , y: 0.0
                , z: 0.0
                , w: 0.9963897

            },
            r_toeL: {
                x: 0.4789358
                , y: -0.0219735
                , z: 0.0506356
                , w: 0.8761128
            },
            pelvisR: {
                x: 0.0765221
                , y: 0.2325539
                , z: -0.5489669
                , w: -0.7991861
            },
            thighR: {
                x: -0.5264688
                , y: -0.5481223
                , z: -0.6323106
                , w: -0.1502528
            },
            shinR: {
                x: -0.472627
                , y: 0.0179751
                , z: -0.05109
                , w: 0.8795968
            },
            footR: {
                x: 0.0
                , y: 0.0
                , z: 0.0
                , w: 1.0
            },
            r_toeR: {
                x: 0.8674232
                , y: 0.0
                , z: 0.0
                , w: 0.497571

            },
            pelvisC: {
                x: 0.8045991
                , y: 0.0
                , z: 0.0
                , w: 0.5938184
            }
        }
        this.walkRConfiguration = {
            model: { x: 0, y: 0, z: 0, w: 1 },
            spine0: {
                x: 0.6816388
                , y: 0.0
                , z: 0.0
                , w: 0.7316889
            },

            tail0: {
                x: 0.9678639
                , y: 0.0
                , z: 0.0
                , w: -0.2514748

            },
            tail1: {
                x: 0.1494381
                , y: 0.0
                , z: 0.0
                , w: 0.9887711
            },
            tail2: {
                x: 0.1494381
                , y: 0.0
                , z: 0.0
                , w: 0.9887711

            },
            tail3: {
                x: 0.1494381
                , y: 0.0
                , z: 0.0
                , w: 0.9887711

            },
            tail4: {
                x: 0.0998334
                , y: 0.0
                , z: 0.0
                , w: 0.9950042
            },

            spine1: {
                x: 0.0
                , y: 0.0
                , z: 0.0
                , w: 1.0
            },
            spine2: {
                x: 0.0998334
                , y: 0
                , z: 0
                , w: 0.9950042
            },
            spine3: {
                x: 0.0499792
                , y: 0
                , z: 0
                , w: 0.9987503
            },
            spine4: {
                x: 0.1494381
                , y: 0
                , z: 0
                , w: 0.9887711
            },
            spine5: {
                x: 0.4498458
                , y: 0
                , z: 0
                , w: -0.8931063
            },
            spine6: {
                x: 0.14112
                , y: 0.0
                , z: 0.0
                , w: -0.9899925
            },

            face: {
                x: 0.381661
                , y: 0.0
                , z: 0.0
                , w: -0.9243024
            },

            breastC: {
                x: 0.0
                , y: 0.0
                , z: 0.0
                , w: 1.0
            },
            shoulderL: {
                x: -0.2039739
                , y: -0.9049074
                , z: -0.1640567
                , w: -0.3355931
            },
            upperarmL: {
                x: 0.3785603
                , y: -0.273528
                , z: -0.0056681
                , w: -0.8842185
            },
            forearmL: {
                x: 0.358794
                , y: 0.1162377
                , z: 0.0450843
                , w: 0.925053
            },
            handL: {
                x: 0.0
                , y: 0.0
                , z: 0.0
                , w: 1.0
            },
            f_toeL: {
                x: 0.2570806
                , y: 0.0
                , z: 0.0
                , w: 0.96639
            },
            shoulderR: {
                x: 0.1672453

                , y: -0.9696687

                , z: -0.1756525

                , w: -0.030296

            },
            upperarmR: {
                x: -0.3746774

                , y: -0.1760081

                , z: 0.0726769

                , w: 0.9073897

            },
            forearmR: {
                x: 0.3456397

                , y: 0.1232574

                , z: 0.0975998

                , w: 0.9251027

            },
            handR: {
                x: 0.0  
                , y: 0.0
                , z: 0.0
                , w: 1.0
            },
            f_toeR: {
                x: 0.3662725

                , y: 0.0
                , z: 0.0
                , w: 0.9305076

            },

            bellyC: {
                x: 0.6631354
                , y: 0.0
                , z: 0.0
                , w: 0.7484994
            },
            pelvisL: {
                x: -0.3843718
                , y: -0.0945456
                , z: -0.5097223
                , w: 0.7638735
            },
            thighL: {
                x: -0.5026259
                , y: 0.535529
                , z: 0.6385438
                , w: -0.2298645
            },
            shinL: {
                x: -0.3824423
                , y: -0.0250657
                , z: 0.048176
                , w: 0.9223821
            },
            footL: {
                x: 0.0848977
                , y: 0.0
                , z: 0.0
                , w: 0.9963897

            },
            r_toeL: {
                x: 0.4789358
                , y: -0.0219735
                , z: 0.0506356
                , w: 0.8761128
            },
            pelvisR: {
                x: 0.0765221
                , y: 0.2325539
                , z: -0.5489669
                , w: -0.7991861
            },
            thighR: {
                x: -0.5264688
                , y: -0.5481223
                , z: -0.6323106
                , w: -0.1502528
            },
            shinR: {
                x: -0.472627
                , y: 0.0179751
                , z: -0.05109
                , w: 0.8795968
            },
            footR: {
                x: 0.0
                , y: 0.0
                , z: 0.0
                , w: 1.0
            },
            r_toeR: {
                x: 0.8674232
                , y: 0.0
                , z: 0.0
                , w: 0.497571

            },
            pelvisC: {
                x: 0.8045991
                , y: 0.0
                , z: 0.0
                , w: 0.5938184
            }
        }
        this.idleConfiguration = {
            model: { x: 0, y: 0, z: 0, w: 1 },
            spine0: {
                x: 0.6365372
                , y: 0.0
                , z: 0.0
                , w: 0.771246
            },

            tail0: {
                x: 0.9945757
                , y: 0.0
                , z: 0.0
                , w: -0.1040152
            },
            tail1: {
                x: 0.0499792
                , y: 0.0
                , z: 0.0
                , w: 0.9987503
            },
            tail2: {
                x: 0.1741081
                , y: 0.0
                , z: 0.0
                , w: 0.9847265
            },
            tail3: {
                x: 0.1741081
                , y: 0.0
                , z: 0.0
                , w: 0.9847265
            },
            tail4: {
                x: 0.1741081
                , y: 0.0
                , z: 0.0
                , w: 0.9847265
            },
            spine1: {
                x: 0.1246747
                , y: 0.0
                , z: 0.0
                , w: 0.9921977
            },
            spine2: {
                x: 0.0515698
                , y: 0.0
                , z: 0.0
                , w: -0.9986694
            },
            spine3: {
                x: 0.0
                , y: 0.0
                , z: 0.0
                , w: 1.0

            },
            spine4: {
                x: 0.0815022
                , y: 0.0
                , z: 0.0
                , w: -0.9966732
            },
            spine5: {
                x: 0.1312132
                , y: 0.0
                , z: 0.0
                , w: -0.9913542
            },
            spine6: {
                x: 0.1063909
                , y: 0.0
                , z: 0.0
                , w: -0.9943244
            },

            face: {
                x: 0.4000695
                , y: 0.0
                , z: 0.0
                , w: -0.9164848
            },
            breastC: {
                x: 0.0
                , y: 0.0
                , z: 0.0
                , w: 1.0
            },
            shoulderL: {
                x: -0.1348464
                , y: -0.9329427
                , z: -0.3327492
                , w: -0.0266914
            },
            upperarmL: {
                x: 0.7059555
                , y: -0.164681
                , z: 0.000778
                , w: -0.6888442
            },
            forearmL: {
                x: 0.3246319
                , y: -0.0132872
                , z: -0.0432086
                , w: 0.9447595
            },
            handL: {
                x: -0.0878518
                , y: 0.0286158
                , z: -0.0776383
                , w: -0.992691
            },
            f_toeL: {
                x: 0.6015165
                , y: -0.0321772
                , z: -0.0761094
                , w: 0.7945753
            },
            shoulderR: {
                x: -0.1368365
                , y: 0.9325583
                , z: 0.3329354
                , w: -0.0276557
            },
            upperarmR: {
                x: 0.7054278
                , y: 0.1668698
                , z: -0.0008353
                , w: -0.6888581
            },
            forearmR: {
                x: 0.3245709
                , y: 0.0122985
                , z: 0.0411896
                , w: 0.9448841
            },
            handR: {
                x: -0.0879383
                , y: -0.0271753
                , z: 0.0793646
                , w: -0.9925873
            },
            f_toeR: {
                x: 0.6014814
                , y: 0.031864
                , z: 0.0738931
                , w: 0.7948236
            },
            bellyC: {
                x: 0.6631354
                , y: 0
                , z: 0
                , w: 0.7484994
            },
            pelvisL: {
                x: -0.1700095
                , y: 0.0456648
                , z: -0.4998317
                , w: 0.8480447
            },
            thighL: {
                x: -0.5026259
                , y: 0.535529
                , z: 0.6385438
                , w: -0.2298645
            },
            shinL: {
                x: -0.6379436
                , y: -0.0097092
                , z: 0.0534317
                , w: 0.7681658
            },
            footL: {
                x: 0.4394623
                , y: 0
                , z: 0
                , w: 0.898261
            },
            r_toeL: {
                x: 0.6319213
                , y: -0.0309128
                , z: 0.0457296
                , w: 0.7730645
            },
            pelvisR: {
                x: 0.0565206

                , y: 0.246204

                , z: -0.5429821

                , w: -0.8008492
            },
            thighR: {
                x: -0.5264688
                , y: -0.5481223
                , z: -0.6323106
                , w: -0.1502528
            },
            shinR: {
                x: -0.6379548
                , y: 0.0074668
                , z: -0.0536427
                , w: 0.7681669
            },
            footR: {
                x: 0.4394623
                , y: 0.0
                , z: 0.0
                , w: 0.898261
            },
            r_toeR: {
                x: 0.6319352
                , y: 0.0306875
                , z: -0.0479664
                , w: 0.7729265
            },
            pelvisC: {
                x: 0.8045991
                , y: 0.0
                , z: 0.0
                , w: 0.5938184
            }
        }



        this.tweensIdle = [];
        this.tweensWalkL = [];
        this.tweensWalkR = [];
    }

    init() {
        var parts = this.cat.parts;
        for (const [key, value] of Object.entries(parts)) {
            console.log(key, value.quaternion);
        }
        console.log(this.cat.parts)
        this.tweenGroup = new TWEEN.Group();
        this.cat.model.position.set(0, 0, 600);
        this.tweensWalkL = this.setupTween(this.walkLConfiguration, 1000);
        this.tweensIdle = this.setupTween(this.idleConfiguration, 0)
        this.tweensWalkR = this.setupTween(this.walkRConfiguration, 10000);
        
        //this.tweenx = this.setTweenx()
        //this.chain(this.tweensIdle, this.tweensWalkL)
        this.chain(this.tweensWalkL, this.tweensWalkR)
        this.chain(this.tweensWalkR, this.tweensWalkL)
        this.start(this.tweensIdle)
        for (var tween of this.tweensIdle) {
            tween.update()
        }
        this.stop(this.tweensIdle)
        console.log(this.cat.parts)
        for (var tween of this.tweensWalkL) {
            //tween.repeat(Infinity)
            //tween.yoyo(true)
        }
        this.start(this.tweensWalkL)
        /*this.tweensRest = this.setupTween(this.restConfiguration, 0);
        this.start(this.tweensRest)
        for (var tween of this.tweensRest) {
            tween.update()
        }
        this.stop(this.tweensRest)
        this.tweensStretch = this.setupTween(this.stretchConfiguration, 2500);
        for (var tween of this.tweensStretch) {
            tween.easing(TWEEN.Easing.Quadratic.Out)
            tween.yoyo(true)
            tween.repeat(Infinity)
            tween.delay(5000)
        }
        this.start(this.tweensStretch)
*/
    }
    setTweenx(){
        var position = new THREE.Vector3(this.cat.model.position.x, this.cat.model.position.y, this.cat.model.position.z);
        console.log(position)
        position.z = position.z + 25;
        var tweenx = new TWEEN.Tween(this.cat.model.position, this.tweenGroup).to(position, 1000).onUpdate(() => {
            
        });

        tweenx.onComplete(() => {
            console.log(tweenx)
            this.tweenx=this.setTweenx();
        })
        tweenx.start()
        return tweenx
    }

    setupTween(configuration, time) {
        var cat = this.cat;
        var tweens = [];
        tweens.push(new TWEEN.Tween(cat.model.quaternion, this.tweenGroup).to(configuration.model, time));
        tweens.push(new TWEEN.Tween(cat.parts.spine0.quaternion, this.tweenGroup).to(configuration.spine0, time));

        tweens.push(new TWEEN.Tween(cat.parts.tail0.quaternion, this.tweenGroup).to(configuration.tail0, time));
        tweens.push(new TWEEN.Tween(cat.parts.tail1.quaternion, this.tweenGroup).to(configuration.tail1, time));
        tweens.push(new TWEEN.Tween(cat.parts.tail2.quaternion, this.tweenGroup).to(configuration.tail2, time));
        tweens.push(new TWEEN.Tween(cat.parts.tail3.quaternion, this.tweenGroup).to(configuration.tail3, time));
        tweens.push(new TWEEN.Tween(cat.parts.tail4.quaternion, this.tweenGroup).to(configuration.tail4, time));

        tweens.push(new TWEEN.Tween(cat.parts.spine1.quaternion, this.tweenGroup).to(configuration.spine1, time));
        tweens.push(new TWEEN.Tween(cat.parts.spine2.quaternion, this.tweenGroup).to(configuration.spine2, time));
        tweens.push(new TWEEN.Tween(cat.parts.spine3.quaternion, this.tweenGroup).to(configuration.spine3, time));
        tweens.push(new TWEEN.Tween(cat.parts.spine4.quaternion, this.tweenGroup).to(configuration.spine4, time));
        tweens.push(new TWEEN.Tween(cat.parts.spine5.quaternion, this.tweenGroup).to(configuration.spine5, time));
        tweens.push(new TWEEN.Tween(cat.parts.spine6.quaternion, this.tweenGroup).to(configuration.spine6, time));

        tweens.push(new TWEEN.Tween(cat.parts.face.quaternion, this.tweenGroup).to(configuration.face, time));
        tweens.push(new TWEEN.Tween(cat.parts.breastC.quaternion, this.tweenGroup).to(configuration.breastC, time));

        tweens.push(new TWEEN.Tween(cat.parts.shoulderL.quaternion, this.tweenGroup).to(configuration.shoulderL, time));
        tweens.push(new TWEEN.Tween(cat.parts.upperarmL.quaternion, this.tweenGroup).to(configuration.upperarmL, time));
        tweens.push(new TWEEN.Tween(cat.parts.forearmL.quaternion, this.tweenGroup).to(configuration.forearmL, time));
        tweens.push(new TWEEN.Tween(cat.parts.handL.quaternion, this.tweenGroup).to(configuration.handL, time));
        tweens.push(new TWEEN.Tween(cat.parts.f_toeL.quaternion, this.tweenGroup).to(configuration.f_toeL, time));

        tweens.push(new TWEEN.Tween(cat.parts.shoulderR.quaternion, this.tweenGroup).to(configuration.shoulderR, time));
        tweens.push(new TWEEN.Tween(cat.parts.upperarmR.quaternion, this.tweenGroup).to(configuration.upperarmR, time));
        tweens.push(new TWEEN.Tween(cat.parts.forearmR.quaternion, this.tweenGroup).to(configuration.forearmR, time));
        tweens.push(new TWEEN.Tween(cat.parts.handR.quaternion, this.tweenGroup).to(configuration.handR, time));
        tweens.push(new TWEEN.Tween(cat.parts.f_toeR.quaternion, this.tweenGroup).to(configuration.f_toeR, time));
        tweens.push(new TWEEN.Tween(cat.parts.bellyC.quaternion, this.tweenGroup).to(configuration.bellyC, time));

        tweens.push(new TWEEN.Tween(cat.parts.pelvisL.quaternion, this.tweenGroup).to(configuration.pelvisL, time));
        tweens.push(new TWEEN.Tween(cat.parts.thighL.quaternion, this.tweenGroup).to(configuration.thighL, time));
        tweens.push(new TWEEN.Tween(cat.parts.shinL.quaternion, this.tweenGroup).to(configuration.shinL, time));
        tweens.push(new TWEEN.Tween(cat.parts.footL.quaternion, this.tweenGroup).to(configuration.footL, time));
        tweens.push(new TWEEN.Tween(cat.parts.r_toeL.quaternion, this.tweenGroup).to(configuration.r_toeL, time));

        tweens.push(new TWEEN.Tween(cat.parts.pelvisR.quaternion, this.tweenGroup).to(configuration.pelvisR, time));
        tweens.push(new TWEEN.Tween(cat.parts.thighR.quaternion, this.tweenGroup).to(configuration.thighR, time));
        tweens.push(new TWEEN.Tween(cat.parts.shinR.quaternion, this.tweenGroup).to(configuration.shinR, time));
        tweens.push(new TWEEN.Tween(cat.parts.footR.quaternion, this.tweenGroup).to(configuration.footR, time));
        tweens.push(new TWEEN.Tween(cat.parts.r_toeR.quaternion, this.tweenGroup).to(configuration.r_toeR, time));
        tweens.push(new TWEEN.Tween(cat.parts.pelvisC.quaternion, this.tweenGroup).to(configuration.pelvisC, time));

        console.log(cat)
        return tweens
    }
    start(tweens) {
        for (var tween of tweens) {
            tween.start()
        }
    }
    stop(tweens) {
        for (var tween of tweens) {
            tween.stop()
        }
    }
    chain(tweens1, tweens2) {
        for (let i = 0; i < tweens1.length; i++) {
            tweens1[i].chain(tweens2[i]);
            //tweens2[i].chain(tweens1[i]);
        }
    }
    update() {
        for (var tween of this.tweensWalkL) {
            //tween.update()
        }
        this.tweenGroup.update();
    }
}

export { MoveCatAnimator };