import * as TWEEN from '../libs/tween.js/tween.esm.js';
class CatAnimator {
    constructor(cat, environment) {

        this.cat = cat;
        this.environment = environment;
        this.tweenGroup;
        this.restConfiguration = {
            model: { x: 0, y: 0, z: 0, w: 1 },
            spine0: {
                x: 0.2826518
                , y: 0.2745155
                , z: 0.6593237
                , w: 0.6403448
            },

            tail0: {
                x: 0.9971797
                , y: -0.0245809
                , z: 0.0067541
                , w: 0.0705895
            },
            tail1: {
                x: 0.2196712
                , y: 0.0
                , z: 0.0018807
                , w: -0.9755722
            },
            tail2: {
                x: 0.180486
                , y: 0
                , z: 0.0015244
                , w: -0.9835764
            },
            tail3: {
                x: 0
                , y: 0
                , z: 0.0249974
                , w: 0.9996875
            },
            tail4: {
                x: -0.0625741
                , y: -0.1231555
                , z: 0.0476586
                , w: -0.9892653
            },

            spine1: {
                x: 0.2231064
                , y: 0
                , z: 0
                , w: 0.9747941
            },
            spine2: {
                x: 0.2231064
                , y: 0
                , z: 0
                , w: 0.9747941
            },
            spine3: {
                x: 0.247404
                , y: 0
                , z: 0
                , w: 0.9689124
            },
            spine4: {
                x: 0.1741081
                , y: 0
                , z: 0
                , w: 0.9847265
            },
            spine5: {
                x: 0.1494381
                , y: 0
                , z: 0
                , w: 0.9887711
            },
            spine6: {
                x: 0.0
                , y: 0.0
                , z: 0.0
                , w: 0.0
            },

            face: {
                x: 0.3584366
                , y: 0.0
                , z: 0.0
                , w: -0.9335541
            },

            breastC: {
                x: 0.632673
                , y: 0.0
                , z: 0.0
                , w: 0.774419
            },
            shoulderL: {
                x: -0.1125565
                , y: -0.952307
                , z: -0.2545568
                , w: -0.1250732
            },
            upperarmL: {
                x: 0.6697841
                , y: -0.2386775
                , z: 0.0755898
                , w: -0.6990769
            },
            forearmL: {
                x: -0.256003
                , y: 0.0883905
                , z: 0.0235138
                , w: -0.9623392
            },
            handL: {
                x: 0.1406687
                , y: -0.0112776
                , z: -0.0791149
                , w: -0.9868262
            },
            f_toeL: {
                x: 0.6015165
                , y: -0.0321772
                , z: -0.0761094
                , w: 0.7945753
            },

            shoulderR: {
                x: -0.1123957
                , y: 0.9595339
                , z: 0.2522396
                , w: -0.0551105
            },
            upperarmR: {
                x: 0.6696581
                , y: 0.135438
                , z: 0.0116553
                , w: -0.7301224
            },
            forearmR: {
                x: 0.3616154
                , y: 0.0
                , z: 0.0
                , w: 0.9323273
            },
            handR: {
                x: -0.2529419
                , y: -0.0206841
                , z: -0.0788338
                , w: 0.9640424
            },
            f_toeR: {
                x: 0.6014814
                , y: 0.031864
                , z: 0.0738931
                , w: 0.7948236
            },

            bellyC: {
                x: 0.7242872
                , y: 0
                , z: 0
                , w: 0.6894984
            },
            pelvisL: {
                x: -0.1123027
                , y: -0.1724797
                , z: 0.5199856
                , w: -0.8290077
            },
            thighL: {
                x: -0.4145381
                , y: 0.4995305
                , z: 0.7244878
                , w: -0.2318296
            },
            shinL: {
                x: 0.3908408
                , y: -0.0058631
                , z: -0.0138061
                , w: -0.9203361
            },
            footL: {
                x: 0.1494381

                , y: 0.0
                , z: 0.0
                , w: 0.9887711

            },
            r_toeL: {
                x: 0.6319213

                , y: -0.0309128

                , z: 0.0457296

                , w: 0.7730645

            },
            

            pelvisR: {
                x: 0.105244
                , y: 0.1891511
                , z: -0.476509
                , w: -0.8521061
            },
            thighR: {
                x:-0.5200464
                , y: -0.5581077
                , z:-0.6310935
                , w: -0.1406714
            },
            shinR: {
                x: -0.6286342
                , y: -0.0419244
                , z: -0.0516757
                , w: 0.774849
            },
            
            footR: {
                x: 0.1494381

                , y: 0.0
                , z: 0.0
                , w: 0.9887711

            },
            r_toeR: {
                x: 0.6323621

                , y: 0.0204976

                , z: -0.043393

                , w: 0.773185

            },




            pelvisC: {
                x: 0.9778646
                , y: 0.0
                , z: 0.0
                , w: 0.2092387
            }
        }
        this.stretchConfiguration = {
            model: { x: 0, y: 0, z: 0, w: 1 },
            spine0: {
                x: 0.2826518
                , y: 0.2745155
                , z: 0.6593237
                , w: 0.6403448
            },

            tail0: {
                x: 0.9943964

                , y: 0.000528

                , z: 0.004972

                , w: 0.1055978

            },
            tail1: {
                x: 0.0004743

                , y: 0.0049774

                , z: 0.094856

                , w: 0.9954784

            },
            tail2: {
                x: 0.0749297

                , y: 0

                , z: 0

                , w: 0.9971888

            },
            tail3: {
                x: 0.0749297

                , y: 0
                , z: 0.0
                , w: 0.9971888

            },
            tail4: {
                x: 0.0998334

                , y: 0.0
                , z: 0.0
                , w: 0.9950042

            },

            spine1: {
                x: 0
                , y: 0
                , z: 0
                , w: 1.0
            },
            spine2: {
                x: 0.2197836

                , y: 0
                , z: 0
                , w: -0.9755486

            },
            spine3: {
                x: 0.1510127

                , y: 0
                , z: 0
                , w: -0.9885318

            },
            spine4: {
                x: 0.3208177

                , y: 0
                , z: 0
                , w: -0.947141

            },
            spine5: {
                x: 0.2231064

                , y: 0
                , z: 0
                , w: 0.9747941

            },
            spine6: {
                x: 0.0815022

                , y: 0.0
                , z: 0.0
                , w: -0.9966732

            },

            face: {
                x: 0.6568192


                , y: 0.0
                , z: 0.0
                , w: -0.7540481



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
                x: 0.3225006

                , y: -0.2644826

                , z: -0.0020669

                , w: -0.9088663

            },
            forearmL: {
                x: 0.4259395

                , y: 0.0
                , z: 0.0

                , w: 0.9047517

            },
            handL: {
                x: 0.0
                , y: 0.0
                , z: 0.0799147

                , w: 0.9968017

            },
            f_toeL: {
                x: 0.2231064

                , y: 0.0
                , z: 0.0
                , w: 0.9747941

            },

            shoulderR: {
                x: -0.0873436

                , y: 0.9645824

                , z: -0.1890063

                , w: -0.1619522

            },
            upperarmR: {
                x: 0.6206871

                , y: 0.1142596

                , z: 0.0119036

                , w: -0.7755969

            },
            forearmR: {
                x: 0.3198425

                , y: 0.0125043

                , z: 0.0411276

                , w: 0.9464951

            },
            handR: {
                x: 0.0
                , y: 0.0
                , z: 0.0815022

                , w: -0.9966732

            },
            f_toeR: {
                x: 0.2231064

                , y: 0.0
                , z: 0.0
                , w: 0.9747941

            },

            bellyC: {
                x: 0.5480239

                , y: 0
                , z: 0
                , w: 0.8364626

            },
            pelvisL: {
                x: 0.121631

                , y: -0.1870357

                , z: 0.5314291

                , w: -0.8171944

            },
            thighL: {
                x: -0.5635331

                , y: 0.3926647

                , z: 0.6669458

                , w: -0.2888394

            },
            shinL: {
                x: 0.4543057

                , y: 0.0
                , z: 0.0
                , w: -0.8908459

            },
            footL: {
                x: 0.4394623
                , y: 0
                , z: 0
                , w: 0.898261
            },
            r_toeL: {
                x: 0.0998334
                , y: 0.0
                , z: 0.0
                , w: 0.9950042
            },

            pelvisR: {
                x: 0.105244
                , y: 0.1891511
                , z: -0.476509
                , w: -0.8521061
            },
            thighR: {
                x:-0.5200464
                , y: -0.5581077
                , z:-0.6310935
                , w: -0.1406714
            },
            shinR: {
                x: -0.6286342
                , y: -0.0419244
                , z: -0.0516757
                , w: 0.774849
            },
            footR: {
                x: 0.2951509
                , y: -0.0147699
                , z: 0.0477469
                , w: 0.9541426
            },
            r_toeR: {
                x: 0.0998334
                , y: 0.0
                , z: 0.0
                , w: 0.9950042
            },





            pelvisC: {
                x: 0.9600665

                , y: 0.0110819

                , z: 0.0384232

                , w: 0.2768992

            }
        }
        this.tweensRest = [];
        this.tweensStretch = [];
    }

    init() {
        this.tweenGroup = new TWEEN.Group();
        this.cat.model.position.set(150, 35, -245);
        this.tweensRest = this.setupTween(this.restConfiguration, 0);
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
            tweens2[i].chain(tweens1[i]);
        }
    }
    update() {
        this.tweenGroup.update();
    }
}

export { CatAnimator };