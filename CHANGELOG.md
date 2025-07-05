# Changelog

## [2.1.0](https://github.com/DanSnow/react-reversi/compare/react-reversi-v2.0.1...react-reversi-v2.1.0) (2025-07-05)


### Features

* basic game work ([9dd4685](https://github.com/DanSnow/react-reversi/commit/9dd468571694f5fbc05a7bba8de31c1bda95224e))
* enable bundle analysis via new `analyze` command ([e61a8bc](https://github.com/DanSnow/react-reversi/commit/e61a8bccea470718789a4acf4259fc73f0a4ce81))
* implement game restart functionality ([d8114f9](https://github.com/DanSnow/react-reversi/commit/d8114f98fefbaa6a0a2f7d406303b6b7c71fa61e))
* implement undo functionality and enhance game control ([2d6cfb8](https://github.com/DanSnow/react-reversi/commit/2d6cfb853d3a6cd3452ba06c9205afa6007fb988))
* improve game log to support undo events ([169f349](https://github.com/DanSnow/react-reversi/commit/169f34968cd603a08b61fed16e55cf18a3515e53))
* internationalize the user interface ([2c37597](https://github.com/DanSnow/react-reversi/commit/2c3759744f1c52cfc171068f8c603a74d596c718))
* manage chess hints and retract state with Jotai atoms ([2d69ab4](https://github.com/DanSnow/react-reversi/commit/2d69ab47af31d368a14c2fac096c930f001271cf))
* migrate i18n to inlang paraglide ([ccecd23](https://github.com/DanSnow/react-reversi/commit/ccecd238c4724a7881521250efe3194fc3d39a21))
* porting ui ([0cfa0cd](https://github.com/DanSnow/react-reversi/commit/0cfa0cdb31d56f7a1185376b2e6b25b1ff641020))
* refactor game confirmation dialog for replay support ([0f730c0](https://github.com/DanSnow/react-reversi/commit/0f730c0369ba113e7efb002a9c9334c835d15db5))
* refactor settings modal for i18n and accessibility ([e920c58](https://github.com/DanSnow/react-reversi/commit/e920c58fe8152ef108837d3f916acbf384229791))
* start xstate page ([03dffbc](https://github.com/DanSnow/react-reversi/commit/03dffbcc8debdb83d8a4e5d1672de679780f3552))
* support provide ai ([8f68e4c](https://github.com/DanSnow/react-reversi/commit/8f68e4c2368213ca4844673d4fd9c0b0990bdbef))
* upgrade deps ([4afe3be](https://github.com/DanSnow/react-reversi/commit/4afe3bea325b1cdc95395bcfb0d747952a283ad5))
* use chess placement logic in route ([35c524b](https://github.com/DanSnow/react-reversi/commit/35c524bf723d6d44548b2da9d07d6372af32a256))


### Bug Fixes

* add github corner ([cdbe95e](https://github.com/DanSnow/react-reversi/commit/cdbe95ebf2eb5b05df2f29efb7eb01994ac2d070))
* adjust styles ([996aa31](https://github.com/DanSnow/react-reversi/commit/996aa314ec4124270bf53f9223402739e0bdc883))
* **deps:** pin dependency @t3-oss/env-core to 0.13.8 ([#3043](https://github.com/DanSnow/react-reversi/issues/3043)) ([aa25aa7](https://github.com/DanSnow/react-reversi/commit/aa25aa7a207f7d7a9cf4d6ab1dddc98202bf5076))
* **deps:** update dependency @hookform/resolvers to v3.10.0 ([#2625](https://github.com/DanSnow/react-reversi/issues/2625)) ([f68c395](https://github.com/DanSnow/react-reversi/commit/f68c395fa200288457a445d12d77c6d5a8952a8b))
* **deps:** update dependency @hookform/resolvers to v4.1.0 ([#2693](https://github.com/DanSnow/react-reversi/issues/2693)) ([3be9369](https://github.com/DanSnow/react-reversi/commit/3be9369cb76d32e8203b7ac80c806dba2f1f037b))
* **deps:** update dependency @hookform/resolvers to v4.1.1 ([#2725](https://github.com/DanSnow/react-reversi/issues/2725)) ([5570bc5](https://github.com/DanSnow/react-reversi/commit/5570bc516912c8a6d84d52b63500c7408c4abea4))
* **deps:** update dependency @hookform/resolvers to v4.1.2 ([#2730](https://github.com/DanSnow/react-reversi/issues/2730)) ([c90730f](https://github.com/DanSnow/react-reversi/commit/c90730f5fa875ad2b4634beef580c57d9448d518))
* **deps:** update dependency @hookform/resolvers to v4.1.3 ([#2746](https://github.com/DanSnow/react-reversi/issues/2746)) ([a186d87](https://github.com/DanSnow/react-reversi/commit/a186d87c141a5adb159c0aaec6ac9a76becaa13d))
* **deps:** update dependency @hookform/resolvers to v5 ([e93c9fb](https://github.com/DanSnow/react-reversi/commit/e93c9fb99f0269bc98e7b28022529ada6812e88d))
* **deps:** update dependency @hookform/resolvers to v5.1.0 ([#2978](https://github.com/DanSnow/react-reversi/issues/2978)) ([593b211](https://github.com/DanSnow/react-reversi/commit/593b2112500511d9e3bc26a52a8ae3514596b81f))
* **deps:** update dependency @hookform/resolvers to v5.1.1 ([#2980](https://github.com/DanSnow/react-reversi/issues/2980)) ([540bcdb](https://github.com/DanSnow/react-reversi/commit/540bcdb5fbfa5c476736e49e2dca36cd5021e822))
* **deps:** update dependency @reduxjs/toolkit to v2.5.1 ([#2673](https://github.com/DanSnow/react-reversi/issues/2673)) ([0aaa300](https://github.com/DanSnow/react-reversi/commit/0aaa30048b4e0c6dcb9a609badea99e262c4d913))
* **deps:** update dependency @reduxjs/toolkit to v2.6.0 ([#2729](https://github.com/DanSnow/react-reversi/issues/2729)) ([a8c8265](https://github.com/DanSnow/react-reversi/commit/a8c82659d2447c85382da20dda1c03d8e16589db))
* **deps:** update dependency @reduxjs/toolkit to v2.6.1 ([#2761](https://github.com/DanSnow/react-reversi/issues/2761)) ([be10daa](https://github.com/DanSnow/react-reversi/commit/be10daad3c8e7095511133a4341f7b50b1d23c8c))
* **deps:** update dependency @reduxjs/toolkit to v2.7.0 ([#2849](https://github.com/DanSnow/react-reversi/issues/2849)) ([29f5867](https://github.com/DanSnow/react-reversi/commit/29f58679df1464f01a107a9da69a025d629d8fcb))
* **deps:** update dependency @reduxjs/toolkit to v2.8.1 ([#2899](https://github.com/DanSnow/react-reversi/issues/2899)) ([e024fdc](https://github.com/DanSnow/react-reversi/commit/e024fdc3070c281b20ed51ae14fb8e8a58073d6c))
* **deps:** update dependency @reduxjs/toolkit to v2.8.2 ([#2915](https://github.com/DanSnow/react-reversi/issues/2915)) ([16cc3da](https://github.com/DanSnow/react-reversi/commit/16cc3da950750f0034985cf70cb26aac5c802d7b))
* **deps:** update dependency effect to v3.11.9 ([#2601](https://github.com/DanSnow/react-reversi/issues/2601)) ([fb72e21](https://github.com/DanSnow/react-reversi/commit/fb72e21e72c4e880c867d57b6dc8fb5c84b0c15b))
* **deps:** update dependency effect to v3.12.0 ([#2606](https://github.com/DanSnow/react-reversi/issues/2606)) ([cfa88a7](https://github.com/DanSnow/react-reversi/commit/cfa88a7b528398e4cc8f88a8898161f74d69a720))
* **deps:** update dependency effect to v3.12.1 ([#2623](https://github.com/DanSnow/react-reversi/issues/2623)) ([668658a](https://github.com/DanSnow/react-reversi/commit/668658a4d86d72bf9839135c9f7de380481b1251))
* **deps:** update dependency effect to v3.12.10 ([#2687](https://github.com/DanSnow/react-reversi/issues/2687)) ([fd39670](https://github.com/DanSnow/react-reversi/commit/fd39670f761b1b0bb336ed14e91c6f90837d7e8f))
* **deps:** update dependency effect to v3.12.11 ([#2695](https://github.com/DanSnow/react-reversi/issues/2695)) ([7e7e3e9](https://github.com/DanSnow/react-reversi/commit/7e7e3e9028fdc1990ff09fd397edaf08fd84309d))
* **deps:** update dependency effect to v3.12.2 ([#2634](https://github.com/DanSnow/react-reversi/issues/2634)) ([1f277f7](https://github.com/DanSnow/react-reversi/commit/1f277f70fdbf4469c11e622c797e575c6655d28c))
* **deps:** update dependency effect to v3.12.3 ([#2639](https://github.com/DanSnow/react-reversi/issues/2639)) ([7f275ae](https://github.com/DanSnow/react-reversi/commit/7f275ae423b1f7177133f6fee52e6f4a1a398144))
* **deps:** update dependency effect to v3.12.4 ([#2641](https://github.com/DanSnow/react-reversi/issues/2641)) ([b729ddf](https://github.com/DanSnow/react-reversi/commit/b729ddf5e128769de6af385525852bc4e02614df))
* **deps:** update dependency effect to v3.12.5 ([#2648](https://github.com/DanSnow/react-reversi/issues/2648)) ([7df0811](https://github.com/DanSnow/react-reversi/commit/7df0811803d5dc05810f355afdbb0af22f568054))
* **deps:** update dependency effect to v3.12.6 ([#2658](https://github.com/DanSnow/react-reversi/issues/2658)) ([1c5c940](https://github.com/DanSnow/react-reversi/commit/1c5c9401c5d8715dd3daeb9991776e3c0c900646))
* **deps:** update dependency effect to v3.12.7 ([#2661](https://github.com/DanSnow/react-reversi/issues/2661)) ([91d00da](https://github.com/DanSnow/react-reversi/commit/91d00da313e76a963d2ef2390e02d51d215b0dc0))
* **deps:** update dependency effect to v3.12.9 ([#2684](https://github.com/DanSnow/react-reversi/issues/2684)) ([5a0a33a](https://github.com/DanSnow/react-reversi/commit/5a0a33ac18cb64fdaa127cd2b117dd0f3be452cc))
* **deps:** update dependency effect to v3.13.0 ([#2704](https://github.com/DanSnow/react-reversi/issues/2704)) ([19a6dba](https://github.com/DanSnow/react-reversi/commit/19a6dba42525e1f275d3dd3bbccb3b75944659ce))
* **deps:** update dependency effect to v3.13.1 ([#2706](https://github.com/DanSnow/react-reversi/issues/2706)) ([98fe25d](https://github.com/DanSnow/react-reversi/commit/98fe25d13bdefde42b57c3d20af08f65c80d3158))
* **deps:** update dependency effect to v3.13.10 ([#2772](https://github.com/DanSnow/react-reversi/issues/2772)) ([bf19834](https://github.com/DanSnow/react-reversi/commit/bf198348e1fad24c86cc3d0992ea1a2387666849))
* **deps:** update dependency effect to v3.13.11 ([#2781](https://github.com/DanSnow/react-reversi/issues/2781)) ([93ded63](https://github.com/DanSnow/react-reversi/commit/93ded63cd57f7644837cc455ded4d1d504f91115))
* **deps:** update dependency effect to v3.13.12 ([#2783](https://github.com/DanSnow/react-reversi/issues/2783)) ([499f693](https://github.com/DanSnow/react-reversi/commit/499f693437335aadfa74fdbcbe1d6796ba34ba9c))
* **deps:** update dependency effect to v3.13.2 ([#2711](https://github.com/DanSnow/react-reversi/issues/2711)) ([1c23f98](https://github.com/DanSnow/react-reversi/commit/1c23f9815b8de5bfb14ab55a92e04fbd11da7cb4))
* **deps:** update dependency effect to v3.13.3 ([#2737](https://github.com/DanSnow/react-reversi/issues/2737)) ([e26499e](https://github.com/DanSnow/react-reversi/commit/e26499e08d11379f42d18309d0d19820583987d1))
* **deps:** update dependency effect to v3.13.4 ([#2738](https://github.com/DanSnow/react-reversi/issues/2738)) ([0eba2f9](https://github.com/DanSnow/react-reversi/commit/0eba2f9b3785cbf821dc433fb92c9013152211c3))
* **deps:** update dependency effect to v3.13.6 ([#2749](https://github.com/DanSnow/react-reversi/issues/2749)) ([3afaeae](https://github.com/DanSnow/react-reversi/commit/3afaeaef466cb884ad41c9e0685c12f97d624259))
* **deps:** update dependency effect to v3.13.7 ([#2756](https://github.com/DanSnow/react-reversi/issues/2756)) ([11f14dd](https://github.com/DanSnow/react-reversi/commit/11f14dd5b80e6a5391f6b7c80672c39d30361d2c))
* **deps:** update dependency effect to v3.13.8 ([#2769](https://github.com/DanSnow/react-reversi/issues/2769)) ([1225069](https://github.com/DanSnow/react-reversi/commit/1225069f637bd6cbbb9ee27b02207172402838bc))
* **deps:** update dependency effect to v3.13.9 ([#2771](https://github.com/DanSnow/react-reversi/issues/2771)) ([262488a](https://github.com/DanSnow/react-reversi/commit/262488a80957ee45b59e641fc6491b3cce84f6c9))
* **deps:** update dependency effect to v3.14.0 ([#2787](https://github.com/DanSnow/react-reversi/issues/2787)) ([3606e26](https://github.com/DanSnow/react-reversi/commit/3606e26b1bfe2ef15d5787f602d173e24c6f082a))
* **deps:** update dependency effect to v3.14.1 ([#2788](https://github.com/DanSnow/react-reversi/issues/2788)) ([7196712](https://github.com/DanSnow/react-reversi/commit/7196712c0b6e0eaa31a5097f2e2aef6fcbbcc0b0))
* **deps:** update dependency effect to v3.14.10 ([#2847](https://github.com/DanSnow/react-reversi/issues/2847)) ([fd1b108](https://github.com/DanSnow/react-reversi/commit/fd1b1085e3306caa0871c3caf9f8c304d028e48c))
* **deps:** update dependency effect to v3.14.11 ([#2854](https://github.com/DanSnow/react-reversi/issues/2854)) ([091c71b](https://github.com/DanSnow/react-reversi/commit/091c71b6855386df486e494214d0d00e610abff2))
* **deps:** update dependency effect to v3.14.12 ([#2864](https://github.com/DanSnow/react-reversi/issues/2864)) ([a5ed377](https://github.com/DanSnow/react-reversi/commit/a5ed37731c50bbfe87ff2d152c6771727319bf90))
* **deps:** update dependency effect to v3.14.13 ([#2867](https://github.com/DanSnow/react-reversi/issues/2867)) ([a666315](https://github.com/DanSnow/react-reversi/commit/a6663157383a14ea774995dd0e798ac7bf38a9bf))
* **deps:** update dependency effect to v3.14.14 ([#2870](https://github.com/DanSnow/react-reversi/issues/2870)) ([a8ef84a](https://github.com/DanSnow/react-reversi/commit/a8ef84a20d3db12b9e3987e7ae32ffaebbd0f596))
* **deps:** update dependency effect to v3.14.15 ([#2873](https://github.com/DanSnow/react-reversi/issues/2873)) ([94b0196](https://github.com/DanSnow/react-reversi/commit/94b01969013097c2dad01a0750a8e45ae8bd3786))
* **deps:** update dependency effect to v3.14.18 ([#2876](https://github.com/DanSnow/react-reversi/issues/2876)) ([90cf961](https://github.com/DanSnow/react-reversi/commit/90cf9615cfd14656413e1c603f92eb6e556bff1c))
* **deps:** update dependency effect to v3.14.19 ([#2894](https://github.com/DanSnow/react-reversi/issues/2894)) ([2e37c16](https://github.com/DanSnow/react-reversi/commit/2e37c1628d564e98f16b97189946fb3e38c061be))
* **deps:** update dependency effect to v3.14.2 ([#2798](https://github.com/DanSnow/react-reversi/issues/2798)) ([091dbc2](https://github.com/DanSnow/react-reversi/commit/091dbc2ab3d17507a1f092c7a3592b92bde3a816))
* **deps:** update dependency effect to v3.14.20 ([#2900](https://github.com/DanSnow/react-reversi/issues/2900)) ([5c96419](https://github.com/DanSnow/react-reversi/commit/5c96419355eea0fc3ac9cd33ffd6d06b80a67d36))
* **deps:** update dependency effect to v3.14.21 ([#2905](https://github.com/DanSnow/react-reversi/issues/2905)) ([b106680](https://github.com/DanSnow/react-reversi/commit/b106680031f49b8f76c3c66187f2a311dd7adde0))
* **deps:** update dependency effect to v3.14.22 ([#2907](https://github.com/DanSnow/react-reversi/issues/2907)) ([0197348](https://github.com/DanSnow/react-reversi/commit/0197348ad4ca0ebae3792f2bfa68bc740c49496b))
* **deps:** update dependency effect to v3.14.4 ([#2808](https://github.com/DanSnow/react-reversi/issues/2808)) ([2a018eb](https://github.com/DanSnow/react-reversi/commit/2a018eb4577f875385873c5ca61699e19dcc1efc))
* **deps:** update dependency effect to v3.14.5 ([#2814](https://github.com/DanSnow/react-reversi/issues/2814)) ([c360e39](https://github.com/DanSnow/react-reversi/commit/c360e39be669d82379e6d44a081e349ee8108e5a))
* **deps:** update dependency effect to v3.14.6 ([#2822](https://github.com/DanSnow/react-reversi/issues/2822)) ([bc17508](https://github.com/DanSnow/react-reversi/commit/bc17508670fc7180a5e95886264d0e91784c558c))
* **deps:** update dependency effect to v3.14.7 ([#2827](https://github.com/DanSnow/react-reversi/issues/2827)) ([183dbb6](https://github.com/DanSnow/react-reversi/commit/183dbb690af6da994dcde3355b5a9c2f49a4ac2d))
* **deps:** update dependency effect to v3.14.8 ([#2834](https://github.com/DanSnow/react-reversi/issues/2834)) ([240f5ce](https://github.com/DanSnow/react-reversi/commit/240f5ce45a9031fde97f1db10afcdfb9b020cedd))
* **deps:** update dependency effect to v3.14.9 ([#2846](https://github.com/DanSnow/react-reversi/issues/2846)) ([7754f76](https://github.com/DanSnow/react-reversi/commit/7754f76c5bab9743e1c4f3b1f4966988d3d3966a))
* **deps:** update dependency effect to v3.15.0 ([#2909](https://github.com/DanSnow/react-reversi/issues/2909)) ([bfed6e1](https://github.com/DanSnow/react-reversi/commit/bfed6e1b637efc8f5a5ff514228c7038ee3a9b90))
* **deps:** update dependency effect to v3.15.1 ([#2914](https://github.com/DanSnow/react-reversi/issues/2914)) ([f1dbba1](https://github.com/DanSnow/react-reversi/commit/f1dbba19d141a9b7621338f4fa7baa5ef276d5dc))
* **deps:** update dependency effect to v3.15.2 ([#2917](https://github.com/DanSnow/react-reversi/issues/2917)) ([bc94adf](https://github.com/DanSnow/react-reversi/commit/bc94adf062d1b66a7b27df12881bb65f5d031400))
* **deps:** update dependency effect to v3.15.3 ([#2934](https://github.com/DanSnow/react-reversi/issues/2934)) ([04898ae](https://github.com/DanSnow/react-reversi/commit/04898aedebf7bc4c496043d47ccbf230712c5fb8))
* **deps:** update dependency effect to v3.15.4 ([#2938](https://github.com/DanSnow/react-reversi/issues/2938)) ([fcd5152](https://github.com/DanSnow/react-reversi/commit/fcd515293607da29711be78e4e56381d74d97a5c))
* **deps:** update dependency effect to v3.16.0 ([#2946](https://github.com/DanSnow/react-reversi/issues/2946)) ([d026cf9](https://github.com/DanSnow/react-reversi/commit/d026cf9c1e174f5bcd8e3df2579057a1fc4021ce))
* **deps:** update dependency effect to v3.16.1 ([#2948](https://github.com/DanSnow/react-reversi/issues/2948)) ([a58c7d1](https://github.com/DanSnow/react-reversi/commit/a58c7d1c13ebf4f6316f18bc2bd2192e79d0c450))
* **deps:** update dependency effect to v3.16.10 ([#3026](https://github.com/DanSnow/react-reversi/issues/3026)) ([1bd355c](https://github.com/DanSnow/react-reversi/commit/1bd355c07bb07757389b8ecc25b9bd8bc90ba358))
* **deps:** update dependency effect to v3.16.11 ([#3036](https://github.com/DanSnow/react-reversi/issues/3036)) ([6f05412](https://github.com/DanSnow/react-reversi/commit/6f05412b82ff529a29067b554535fa4d435bb282))
* **deps:** update dependency effect to v3.16.12 ([#3038](https://github.com/DanSnow/react-reversi/issues/3038)) ([d1218f2](https://github.com/DanSnow/react-reversi/commit/d1218f2a272f96f49eadd565a00096671f8e60b9))
* **deps:** update dependency effect to v3.16.2 ([#2952](https://github.com/DanSnow/react-reversi/issues/2952)) ([0de6080](https://github.com/DanSnow/react-reversi/commit/0de6080eb1ee6bdc4473736a171cc03afe77b10d))
* **deps:** update dependency effect to v3.16.3 ([#2959](https://github.com/DanSnow/react-reversi/issues/2959)) ([0d2997e](https://github.com/DanSnow/react-reversi/commit/0d2997ef85a6412e15292ba517157e999b6b37f8))
* **deps:** update dependency effect to v3.16.4 ([#2975](https://github.com/DanSnow/react-reversi/issues/2975)) ([0aa4b57](https://github.com/DanSnow/react-reversi/commit/0aa4b5765adb73d7db807d6a841c8de78e4b3af7))
* **deps:** update dependency effect to v3.16.5 ([#2979](https://github.com/DanSnow/react-reversi/issues/2979)) ([a4c1f8b](https://github.com/DanSnow/react-reversi/commit/a4c1f8b99ddd15e5020ee9fe2b1e33f1ccdac5f3))
* **deps:** update dependency effect to v3.16.6 ([#2995](https://github.com/DanSnow/react-reversi/issues/2995)) ([b106399](https://github.com/DanSnow/react-reversi/commit/b106399ec2901cb81c01daeb7c2208c75b420525))
* **deps:** update dependency effect to v3.16.7 ([#2997](https://github.com/DanSnow/react-reversi/issues/2997)) ([fe750d9](https://github.com/DanSnow/react-reversi/commit/fe750d96fd9e10e07e83b61089c44b9a36ff2c3f))
* **deps:** update dependency effect to v3.16.8 ([#3006](https://github.com/DanSnow/react-reversi/issues/3006)) ([62c2272](https://github.com/DanSnow/react-reversi/commit/62c2272d86835d92c2766d6a93aadecccf906875))
* **deps:** update dependency effect to v3.16.9 ([#3021](https://github.com/DanSnow/react-reversi/issues/3021)) ([923f1ca](https://github.com/DanSnow/react-reversi/commit/923f1cabefa13173ac66176b6987a0788ca566b1))
* **deps:** update dependency i18next to v24.2.3 ([#2778](https://github.com/DanSnow/react-reversi/issues/2778)) ([bf09bf4](https://github.com/DanSnow/react-reversi/commit/bf09bf4d63195c8464edb0f89395df8b1b2d3f99))
* **deps:** update dependency i18next-browser-languagedetector to v8.0.3 ([#2705](https://github.com/DanSnow/react-reversi/issues/2705)) ([44cd8cd](https://github.com/DanSnow/react-reversi/commit/44cd8cdeb926cd992a42d1591570bb8679657a1b))
* **deps:** update dependency i18next-browser-languagedetector to v8.0.4 ([#2720](https://github.com/DanSnow/react-reversi/issues/2720)) ([79332fd](https://github.com/DanSnow/react-reversi/commit/79332fd762a225bbd83188fa05674e26d8424219))
* **deps:** update dependency i18next-browser-languagedetector to v8.0.5 ([#2855](https://github.com/DanSnow/react-reversi/issues/2855)) ([a466ff0](https://github.com/DanSnow/react-reversi/commit/a466ff075ca3d0d004a67ab332c8857d1a5be55e))
* **deps:** update dependency i18next-browser-languagedetector to v8.1.0 ([#2880](https://github.com/DanSnow/react-reversi/issues/2880)) ([b82ca3a](https://github.com/DanSnow/react-reversi/commit/b82ca3add569efdcc73807e9f20491abc846c5b4))
* **deps:** update dependency i18next-browser-languagedetector to v8.2.0 ([#2988](https://github.com/DanSnow/react-reversi/issues/2988)) ([ad73241](https://github.com/DanSnow/react-reversi/commit/ad73241e98a98d3cc9e670b0a69c775a88124335))
* **deps:** update dependency jotai to v2.11.0 ([#2607](https://github.com/DanSnow/react-reversi/issues/2607)) ([84c3f63](https://github.com/DanSnow/react-reversi/commit/84c3f63876b1db11c063d39c10e7a85607ac4391))
* **deps:** update dependency jotai to v2.11.1 ([#2651](https://github.com/DanSnow/react-reversi/issues/2651)) ([84afb54](https://github.com/DanSnow/react-reversi/commit/84afb545ae2a85dbb1c574f4bac597f73d1febcc))
* **deps:** update dependency jotai to v2.11.2 ([#2679](https://github.com/DanSnow/react-reversi/issues/2679)) ([9ea6e1b](https://github.com/DanSnow/react-reversi/commit/9ea6e1bc0c11979ee0f0a7fb77b9a66ca1581993))
* **deps:** update dependency jotai to v2.11.3 ([#2681](https://github.com/DanSnow/react-reversi/issues/2681)) ([767abb1](https://github.com/DanSnow/react-reversi/commit/767abb1e5f5fa575f668d2cee6cf2ac109537345))
* **deps:** update dependency jotai to v2.12.0 ([#2697](https://github.com/DanSnow/react-reversi/issues/2697)) ([1801f70](https://github.com/DanSnow/react-reversi/commit/1801f70ddcfc539b5246c784ddbee4b647b8c552))
* **deps:** update dependency jotai to v2.12.1 ([#2710](https://github.com/DanSnow/react-reversi/issues/2710)) ([2fbba87](https://github.com/DanSnow/react-reversi/commit/2fbba87fc7602acf735d5db9f0eaea48726e7ec4))
* **deps:** update dependency jotai to v2.12.2 ([#2770](https://github.com/DanSnow/react-reversi/issues/2770)) ([63815d6](https://github.com/DanSnow/react-reversi/commit/63815d6e61854af4d4e803e842627bc016186c07))
* **deps:** update dependency jotai to v2.12.3 ([#2838](https://github.com/DanSnow/react-reversi/issues/2838)) ([5fda0ad](https://github.com/DanSnow/react-reversi/commit/5fda0ad9bfd19679a0334a4d25fc25632819ebc0))
* **deps:** update dependency jotai to v2.12.4 ([#2896](https://github.com/DanSnow/react-reversi/issues/2896)) ([a9071cf](https://github.com/DanSnow/react-reversi/commit/a9071cf27e66805713393adddc3b6d9e52a2152e))
* **deps:** update dependency jotai to v2.12.5 ([#2943](https://github.com/DanSnow/react-reversi/issues/2943)) ([1885ca7](https://github.com/DanSnow/react-reversi/commit/1885ca7fd489c4e39581504eb13b75f05c5efdd8))
* **deps:** update dependency jotai-mutative to v1.2.0 ([#2931](https://github.com/DanSnow/react-reversi/issues/2931)) ([1a4061c](https://github.com/DanSnow/react-reversi/commit/1a4061cd1e9e648d2781abf9a0084225785add1d))
* **deps:** update dependency jotai-xstate to v0.6.1 ([#2654](https://github.com/DanSnow/react-reversi/issues/2654)) ([bb6f1e3](https://github.com/DanSnow/react-reversi/commit/bb6f1e3b632dfdcb3ea5543bdc46f956c604cc57))
* **deps:** update dependency lucide-react to v0.469.0 ([#2603](https://github.com/DanSnow/react-reversi/issues/2603)) ([751b37b](https://github.com/DanSnow/react-reversi/commit/751b37bb110649697e2501effe93b91d8c4cb6f7))
* **deps:** update dependency lucide-react to v0.471.0 ([#2630](https://github.com/DanSnow/react-reversi/issues/2630)) ([066b598](https://github.com/DanSnow/react-reversi/commit/066b59825a691ad2159a09994570003340042896))
* **deps:** update dependency lucide-react to v0.471.1 ([#2635](https://github.com/DanSnow/react-reversi/issues/2635)) ([66d955f](https://github.com/DanSnow/react-reversi/commit/66d955fd127be0f45b5a16a0ef7b87c7a23c995c))
* **deps:** update dependency lucide-react to v0.473.0 ([#2649](https://github.com/DanSnow/react-reversi/issues/2649)) ([07b28aa](https://github.com/DanSnow/react-reversi/commit/07b28aa3c0e14027f8037231ed71f9258933e04a))
* **deps:** update dependency lucide-react to v0.474.0 ([#2665](https://github.com/DanSnow/react-reversi/issues/2665)) ([a2e7d5c](https://github.com/DanSnow/react-reversi/commit/a2e7d5c62f26b0e011e1f452089f83e21d12aa31))
* **deps:** update dependency lucide-react to v0.475.0 ([#2688](https://github.com/DanSnow/react-reversi/issues/2688)) ([b210475](https://github.com/DanSnow/react-reversi/commit/b21047555e2f810da0ef6b9c827cce17a43b44ed))
* **deps:** update dependency lucide-react to v0.476.0 ([#2735](https://github.com/DanSnow/react-reversi/issues/2735)) ([4e94aca](https://github.com/DanSnow/react-reversi/commit/4e94aca4b0b1fd0533c42f19e5e9d8f645fe3ec2))
* **deps:** update dependency lucide-react to v0.477.0 ([#2740](https://github.com/DanSnow/react-reversi/issues/2740)) ([6ecac6d](https://github.com/DanSnow/react-reversi/commit/6ecac6d9553ba18bb2087852aacc7b97c62fe579))
* **deps:** update dependency lucide-react to v0.479.0 ([#2760](https://github.com/DanSnow/react-reversi/issues/2760)) ([1a99af1](https://github.com/DanSnow/react-reversi/commit/1a99af1cb52d48b9794b7be652ab77457c76b29d))
* **deps:** update dependency lucide-react to v0.482.0 ([#2780](https://github.com/DanSnow/react-reversi/issues/2780)) ([d70ee35](https://github.com/DanSnow/react-reversi/commit/d70ee352e9ae6f8ab52f069d51211e8a4a63c1cc))
* **deps:** update dependency lucide-react to v0.483.0 ([#2785](https://github.com/DanSnow/react-reversi/issues/2785)) ([dbd91e4](https://github.com/DanSnow/react-reversi/commit/dbd91e47473ce119b43443cf2e5726bd10e20695))
* **deps:** update dependency lucide-react to v0.484.0 ([#2796](https://github.com/DanSnow/react-reversi/issues/2796)) ([9a0c55a](https://github.com/DanSnow/react-reversi/commit/9a0c55a8360b18c46a2c2ede11e57c8feba3cac3))
* **deps:** update dependency lucide-react to v0.485.0 ([#2802](https://github.com/DanSnow/react-reversi/issues/2802)) ([6be16f5](https://github.com/DanSnow/react-reversi/commit/6be16f56061dd9e0ab9b750775f9afefe46b1019))
* **deps:** update dependency lucide-react to v0.486.0 ([#2811](https://github.com/DanSnow/react-reversi/issues/2811)) ([3363a5b](https://github.com/DanSnow/react-reversi/commit/3363a5b874692c77170db9fd49558e18538fe905))
* **deps:** update dependency lucide-react to v0.487.0 ([#2816](https://github.com/DanSnow/react-reversi/issues/2816)) ([df761a5](https://github.com/DanSnow/react-reversi/commit/df761a5dd2dc0975ead857c4e7bcba614ec635e1))
* **deps:** update dependency lucide-react to v0.488.0 ([#2837](https://github.com/DanSnow/react-reversi/issues/2837)) ([53c3e28](https://github.com/DanSnow/react-reversi/commit/53c3e28a5c4f9c11a2e08c674b00beb17b040b4e))
* **deps:** update dependency lucide-react to v0.501.0 ([#2856](https://github.com/DanSnow/react-reversi/issues/2856)) ([dbb3674](https://github.com/DanSnow/react-reversi/commit/dbb36743fbf5bef3a7a9f8e52ca4f4941a24759f))
* **deps:** update dependency lucide-react to v0.503.0 ([#2862](https://github.com/DanSnow/react-reversi/issues/2862)) ([0587556](https://github.com/DanSnow/react-reversi/commit/0587556ebdab8bf1de3a83c36bb5b61d50baec42))
* **deps:** update dependency lucide-react to v0.506.0 ([#2882](https://github.com/DanSnow/react-reversi/issues/2882)) ([adea288](https://github.com/DanSnow/react-reversi/commit/adea288f477bcf8a7f04c5ae54f180110f0cc3ed))
* **deps:** update dependency lucide-react to v0.507.0 ([#2884](https://github.com/DanSnow/react-reversi/issues/2884)) ([872352c](https://github.com/DanSnow/react-reversi/commit/872352c27f1973a6b70e8410efdcdb65f4961e26))
* **deps:** update dependency lucide-react to v0.508.0 ([#2902](https://github.com/DanSnow/react-reversi/issues/2902)) ([fc35dad](https://github.com/DanSnow/react-reversi/commit/fc35dadf1963bbdd5187e256ecbb11b3f29cd681))
* **deps:** update dependency lucide-react to v0.509.0 ([#2906](https://github.com/DanSnow/react-reversi/issues/2906)) ([0f2ec69](https://github.com/DanSnow/react-reversi/commit/0f2ec690456ee25f98db00b2f012628810b58a01))
* **deps:** update dependency lucide-react to v0.510.0 ([#2912](https://github.com/DanSnow/react-reversi/issues/2912)) ([308a343](https://github.com/DanSnow/react-reversi/commit/308a343e22fa34e4a06b205469a72461fb8df79e))
* **deps:** update dependency lucide-react to v0.511.0 ([#2919](https://github.com/DanSnow/react-reversi/issues/2919)) ([11da416](https://github.com/DanSnow/react-reversi/commit/11da4163a50fefe0204526e5fa577855ced0b53a))
* **deps:** update dependency lucide-react to v0.513.0 ([#2970](https://github.com/DanSnow/react-reversi/issues/2970)) ([3009cd7](https://github.com/DanSnow/react-reversi/commit/3009cd75584c0db9ee07df815367491db30edcae))
* **deps:** update dependency lucide-react to v0.514.0 ([#2985](https://github.com/DanSnow/react-reversi/issues/2985)) ([e74cc4d](https://github.com/DanSnow/react-reversi/commit/e74cc4d3690bf889bd4169d72b5148f237ea8711))
* **deps:** update dependency lucide-react to v0.515.0 ([#2998](https://github.com/DanSnow/react-reversi/issues/2998)) ([6a460dd](https://github.com/DanSnow/react-reversi/commit/6a460dd23f361e930f55a7ca0a69768e1635fc71))
* **deps:** update dependency lucide-react to v0.517.0 ([#3005](https://github.com/DanSnow/react-reversi/issues/3005)) ([8418fe6](https://github.com/DanSnow/react-reversi/commit/8418fe63e4aa67baa2e84ba2b059b8d0a243b05a))
* **deps:** update dependency lucide-react to v0.518.0 ([#3013](https://github.com/DanSnow/react-reversi/issues/3013)) ([d941e26](https://github.com/DanSnow/react-reversi/commit/d941e26e21165e8c45ffde8f4614c0e4644d6a47))
* **deps:** update dependency lucide-react to v0.519.0 ([#3016](https://github.com/DanSnow/react-reversi/issues/3016)) ([659355a](https://github.com/DanSnow/react-reversi/commit/659355a2d96c2996691eea8aa496ece553c676e2))
* **deps:** update dependency lucide-react to v0.522.0 ([#3017](https://github.com/DanSnow/react-reversi/issues/3017)) ([51c8371](https://github.com/DanSnow/react-reversi/commit/51c8371a531ddb60623f9db54b8afb89ada6e127))
* **deps:** update dependency lucide-react to v0.523.0 ([#3022](https://github.com/DanSnow/react-reversi/issues/3022)) ([24180f0](https://github.com/DanSnow/react-reversi/commit/24180f05ac9bbb86cd1c499d155f6de3eaa67b5f))
* **deps:** update dependency lucide-react to v0.524.0 ([#3028](https://github.com/DanSnow/react-reversi/issues/3028)) ([3eed021](https://github.com/DanSnow/react-reversi/commit/3eed021985a264b4a4251e19c13fbc93d51d72b1))
* **deps:** update dependency lucide-react to v0.525.0 ([#3029](https://github.com/DanSnow/react-reversi/issues/3029)) ([24f571d](https://github.com/DanSnow/react-reversi/commit/24f571d809fa394e969fe3be6a3130f6e6fbbb66))
* **deps:** update dependency mutative to v1.2.0 ([#2936](https://github.com/DanSnow/react-reversi/issues/2936)) ([3345cfe](https://github.com/DanSnow/react-reversi/commit/3345cfe02c7dd7cdf174fa60969314e396d18783))
* **deps:** update dependency react-hook-form to v7.54.2 ([#2605](https://github.com/DanSnow/react-reversi/issues/2605)) ([ba88d5a](https://github.com/DanSnow/react-reversi/commit/ba88d5a080b70d6c8c9e513629d9c58a21062c66))
* **deps:** update dependency react-hook-form to v7.55.0 ([#2803](https://github.com/DanSnow/react-reversi/issues/2803)) ([8186071](https://github.com/DanSnow/react-reversi/commit/8186071b23985980517b50f1c07af05f9bc1fa13))
* **deps:** update dependency react-hook-form to v7.56.0 ([#2860](https://github.com/DanSnow/react-reversi/issues/2860)) ([89bc336](https://github.com/DanSnow/react-reversi/commit/89bc3362279176b6f8b27453650d83c744ee769c))
* **deps:** update dependency react-hook-form to v7.56.1 ([#2865](https://github.com/DanSnow/react-reversi/issues/2865)) ([c34f341](https://github.com/DanSnow/react-reversi/commit/c34f3412ea818c24ede2a684f844fa5b77c641ff))
* **deps:** update dependency react-hook-form to v7.56.2 ([#2886](https://github.com/DanSnow/react-reversi/issues/2886)) ([da7dab2](https://github.com/DanSnow/react-reversi/commit/da7dab2ff3be6e3aeae1804ba2e07fa4391d38e4))
* **deps:** update dependency react-hook-form to v7.56.3 ([#2903](https://github.com/DanSnow/react-reversi/issues/2903)) ([869d122](https://github.com/DanSnow/react-reversi/commit/869d1224ac4fb8275a8a89e765bad912a9ff8f21))
* **deps:** update dependency react-hook-form to v7.56.4 ([#2921](https://github.com/DanSnow/react-reversi/issues/2921)) ([d3fe96c](https://github.com/DanSnow/react-reversi/commit/d3fe96c30bced07db037c3020c2862de44722714))
* **deps:** update dependency react-hook-form to v7.57.0 ([#2962](https://github.com/DanSnow/react-reversi/issues/2962)) ([87d56ba](https://github.com/DanSnow/react-reversi/commit/87d56ba4f6f06b5e60f524d2b9c937c3ea7ec08a))
* **deps:** update dependency react-hook-form to v7.58.0 ([#3001](https://github.com/DanSnow/react-reversi/issues/3001)) ([531db8f](https://github.com/DanSnow/react-reversi/commit/531db8fa3e3334afed9485d3421a2a0849ebef37))
* **deps:** update dependency react-hook-form to v7.58.1 ([#3010](https://github.com/DanSnow/react-reversi/issues/3010)) ([48bd159](https://github.com/DanSnow/react-reversi/commit/48bd1594886f1a4e19798e1b24a93fe974b3952b))
* **deps:** update dependency react-hook-form to v7.59.0 ([#3031](https://github.com/DanSnow/react-reversi/issues/3031)) ([d4390e8](https://github.com/DanSnow/react-reversi/commit/d4390e855dbe535a9c6d1edf59ade8fda3d74772))
* **deps:** update dependency react-hook-form to v7.60.0 ([#3045](https://github.com/DanSnow/react-reversi/issues/3045)) ([9b86b15](https://github.com/DanSnow/react-reversi/commit/9b86b15001522fd7f3602947149eb5a35dbf0b00))
* **deps:** update dependency react-i18next to v15.3.0 ([#2616](https://github.com/DanSnow/react-reversi/issues/2616)) ([1fd37c3](https://github.com/DanSnow/react-reversi/commit/1fd37c3297899633bb022e05cc1cb433ba380b3e))
* **deps:** update dependency react-i18next to v15.4.0 ([#2617](https://github.com/DanSnow/react-reversi/issues/2617)) ([e9f7d4e](https://github.com/DanSnow/react-reversi/commit/e9f7d4e6b58dc84759a0913555f179069b191fd6))
* **deps:** update dependency react-i18next to v15.4.1 ([#2712](https://github.com/DanSnow/react-reversi/issues/2712)) ([a634cde](https://github.com/DanSnow/react-reversi/commit/a634cded5ab0e4983f0378691eb9fee9aa6aa8e1))
* **deps:** update dependency react-i18next to v15.5.1 ([#2868](https://github.com/DanSnow/react-reversi/issues/2868)) ([42ff884](https://github.com/DanSnow/react-reversi/commit/42ff8847e42cb108c7260de2908de0bd596224c7))
* **deps:** update dependency react-i18next to v15.5.2 ([#2930](https://github.com/DanSnow/react-reversi/issues/2930)) ([02849db](https://github.com/DanSnow/react-reversi/commit/02849dbaf03599bb339c67bfb0ea0fb832747d90))
* **deps:** update dependency react-i18next to v15.5.3 ([#2994](https://github.com/DanSnow/react-reversi/issues/2994)) ([a5be1f6](https://github.com/DanSnow/react-reversi/commit/a5be1f63d5a85b3f0de9a6a67c450d2d226ba45d))
* **deps:** update dependency react-i18next to v15.6.0 ([#3039](https://github.com/DanSnow/react-reversi/issues/3039)) ([ec41f66](https://github.com/DanSnow/react-reversi/commit/ec41f660b770c347beeab842fc4111309e94fb8a))
* **deps:** update dependency react-twc to v1.5.0 ([#3033](https://github.com/DanSnow/react-reversi/issues/3033)) ([604eecc](https://github.com/DanSnow/react-reversi/commit/604eecc6ba702f0bb3db888a0e4f66df380721b5))
* **deps:** update dependency tailwind-merge to v2.6.0 ([#2608](https://github.com/DanSnow/react-reversi/issues/2608)) ([c37409c](https://github.com/DanSnow/react-reversi/commit/c37409cb082cab5314a0a4d1766765ab68c1a882))
* **deps:** update dependency xstate to v5.19.1 ([#2610](https://github.com/DanSnow/react-reversi/issues/2610)) ([cd5d525](https://github.com/DanSnow/react-reversi/commit/cd5d5258653e13fd78bcd5a9ca4950e504264b8d))
* **deps:** update dependency xstate to v5.19.2 ([#2632](https://github.com/DanSnow/react-reversi/issues/2632)) ([cbd126a](https://github.com/DanSnow/react-reversi/commit/cbd126a9ab8f4948dc4efe2b8e0939e8a461afb1))
* **deps:** update dependency xstate to v5.19.3 ([#2911](https://github.com/DanSnow/react-reversi/issues/2911)) ([151513c](https://github.com/DanSnow/react-reversi/commit/151513c1ff264dbfa49908fb33c3dd2cff559259))
* **deps:** update dependency xstate to v5.19.4 ([#2957](https://github.com/DanSnow/react-reversi/issues/2957)) ([306ac36](https://github.com/DanSnow/react-reversi/commit/306ac36a9f07d267829a2e94a48f89fbdfcf21ef))
* **deps:** update dependency xstate to v5.20.0 ([#3014](https://github.com/DanSnow/react-reversi/issues/3014)) ([3ea6bf3](https://github.com/DanSnow/react-reversi/commit/3ea6bf3935feec83b4469a3f7c659864cf8fe459))
* **deps:** update dependency zod to v3.24.2 ([#2699](https://github.com/DanSnow/react-reversi/issues/2699)) ([7a9781b](https://github.com/DanSnow/react-reversi/commit/7a9781b248c0c4a8d91b1654904fd180a1e84d7d))
* **deps:** update dependency zod to v3.24.3 ([#2850](https://github.com/DanSnow/react-reversi/issues/2850)) ([6bee198](https://github.com/DanSnow/react-reversi/commit/6bee198e5981e8e5a5885559d91a100b95c5eac3))
* **deps:** update dependency zod to v3.24.4 ([#2888](https://github.com/DanSnow/react-reversi/issues/2888)) ([cb57ce6](https://github.com/DanSnow/react-reversi/commit/cb57ce63e98fc5c92efb1540148958f545381138))
* **deps:** update dependency zod to v3.25.20 ([#2925](https://github.com/DanSnow/react-reversi/issues/2925)) ([6cd18d9](https://github.com/DanSnow/react-reversi/commit/6cd18d965e4d9196184df78e0526dd1a272d2e4a))
* **deps:** update dependency zod to v3.25.23 ([#2933](https://github.com/DanSnow/react-reversi/issues/2933)) ([d7e807b](https://github.com/DanSnow/react-reversi/commit/d7e807b865b6ee0dab1657eebfa9a7cc4d653ec2))
* **deps:** update dependency zod to v3.25.28 ([#2937](https://github.com/DanSnow/react-reversi/issues/2937)) ([40b9bf7](https://github.com/DanSnow/react-reversi/commit/40b9bf771f5f87f3882f4620e5318f91efb73757))
* **deps:** update dependency zod to v3.25.30 ([#2941](https://github.com/DanSnow/react-reversi/issues/2941)) ([073c367](https://github.com/DanSnow/react-reversi/commit/073c3673f18ed4809b564c60fa41ab615dfc29b1))
* **deps:** update dependency zod to v3.25.32 ([#2945](https://github.com/DanSnow/react-reversi/issues/2945)) ([68cc064](https://github.com/DanSnow/react-reversi/commit/68cc064f90d6efcea7852b8204f9b4726cece295))
* **deps:** update dependency zod to v3.25.36 ([#2949](https://github.com/DanSnow/react-reversi/issues/2949)) ([1493e45](https://github.com/DanSnow/react-reversi/commit/1493e45947bb3235217c41ee3fd0b58606ca7fc1))
* **deps:** update dependency zod to v3.25.41 ([#2953](https://github.com/DanSnow/react-reversi/issues/2953)) ([8b1f088](https://github.com/DanSnow/react-reversi/commit/8b1f088ce21e734cc6f9f4c401cf1ea7bd4fb1da))
* **deps:** update dependency zod to v3.25.42 ([#2955](https://github.com/DanSnow/react-reversi/issues/2955)) ([e768b34](https://github.com/DanSnow/react-reversi/commit/e768b3461733ffa7cb528a786ff359787c46dc76))
* **deps:** update dependency zod to v3.25.43 ([498c51a](https://github.com/DanSnow/react-reversi/commit/498c51ada68dea04847fd90062e65daf23b8c452))
* **deps:** update dependency zod to v3.25.49 ([#2961](https://github.com/DanSnow/react-reversi/issues/2961)) ([7d92b0d](https://github.com/DanSnow/react-reversi/commit/7d92b0d0478a1bc727b049809624113f1a31e137))
* **deps:** update dependency zod to v3.25.51 ([#2968](https://github.com/DanSnow/react-reversi/issues/2968)) ([c0f4fd0](https://github.com/DanSnow/react-reversi/commit/c0f4fd0d012bb4f2a7e2292a731ef4bd5c489e6f))
* **deps:** update dependency zod to v3.25.56 ([#2976](https://github.com/DanSnow/react-reversi/issues/2976)) ([38a0ed7](https://github.com/DanSnow/react-reversi/commit/38a0ed7d194c00227b041f0811f0fc700dfdcb44))
* **deps:** update dependency zod to v3.25.57 ([#2984](https://github.com/DanSnow/react-reversi/issues/2984)) ([b702098](https://github.com/DanSnow/react-reversi/commit/b702098bd013f00f261a341b9159da1470441c26))
* **deps:** update dependency zod to v3.25.58 ([#2987](https://github.com/DanSnow/react-reversi/issues/2987)) ([da24565](https://github.com/DanSnow/react-reversi/commit/da24565e7700290ad327e516ee5227e0d450fe20))
* **deps:** update dependency zod to v3.25.61 ([#2989](https://github.com/DanSnow/react-reversi/issues/2989)) ([2758f4a](https://github.com/DanSnow/react-reversi/commit/2758f4a99b72dab05b4cfea433d135f0722cddbf))
* **deps:** update dependency zod to v3.25.63 ([#2992](https://github.com/DanSnow/react-reversi/issues/2992)) ([9ee6fb1](https://github.com/DanSnow/react-reversi/commit/9ee6fb10a11f2c1bc83b306e4a2c8427bb61d28b))
* **deps:** update dependency zod to v3.25.64 ([#2996](https://github.com/DanSnow/react-reversi/issues/2996)) ([604d4b0](https://github.com/DanSnow/react-reversi/commit/604d4b080f6c35ee50f722fab36a28d0eb58025b))
* **deps:** update dependency zod to v3.25.67 ([#3004](https://github.com/DanSnow/react-reversi/issues/3004)) ([6e89e73](https://github.com/DanSnow/react-reversi/commit/6e89e73e66e61bae128c7fc419443d53732f1866))
* **deps:** update dependency zod to v3.25.7 ([#2923](https://github.com/DanSnow/react-reversi/issues/2923)) ([263c2f5](https://github.com/DanSnow/react-reversi/commit/263c2f50b48bbdbc674dd9b54b9ddccb19895a70))
* **deps:** update dependency zod to v3.25.71 ([#3037](https://github.com/DanSnow/react-reversi/issues/3037)) ([69a8fe4](https://github.com/DanSnow/react-reversi/commit/69a8fe494c8579b742f4b3c7f9af3cee47fc0f5f))
* **deps:** update dependency zod to v3.25.73 ([#3040](https://github.com/DanSnow/react-reversi/issues/3040)) ([251fa76](https://github.com/DanSnow/react-reversi/commit/251fa76268929a6b231d2760022283e5712ce9bb))
* **deps:** update dependency zod to v3.25.74 ([#3044](https://github.com/DanSnow/react-reversi/issues/3044)) ([7a6742b](https://github.com/DanSnow/react-reversi/commit/7a6742b0d04681339528ec96df5d45b0ace78fbe))
* **deps:** update radix-ui-primitives monorepo ([#2662](https://github.com/DanSnow/react-reversi/issues/2662)) ([ab3c20a](https://github.com/DanSnow/react-reversi/commit/ab3c20ac0acd058258ba3b917a7368756e67e7e2))
* **deps:** update radix-ui-primitives monorepo ([#2686](https://github.com/DanSnow/react-reversi/issues/2686)) ([4eb9b9b](https://github.com/DanSnow/react-reversi/commit/4eb9b9b8213c931f41be03990ea27cf4cbb3c52f))
* **deps:** update radix-ui-primitives monorepo ([#2826](https://github.com/DanSnow/react-reversi/issues/2826)) ([008e412](https://github.com/DanSnow/react-reversi/commit/008e412600eb25ea7faf7552b194907cc8311772))
* **deps:** update radix-ui-primitives monorepo ([#2857](https://github.com/DanSnow/react-reversi/issues/2857)) ([83850e7](https://github.com/DanSnow/react-reversi/commit/83850e7322c822b18c89f8adef127195ecd0d420))
* **deps:** update radix-ui-primitives monorepo ([#2866](https://github.com/DanSnow/react-reversi/issues/2866)) ([46e4cda](https://github.com/DanSnow/react-reversi/commit/46e4cdad9ea9334fcdb63d0c398435cead4a9042))
* **deps:** update radix-ui-primitives monorepo ([#2892](https://github.com/DanSnow/react-reversi/issues/2892)) ([07ae623](https://github.com/DanSnow/react-reversi/commit/07ae6230dbbec9205f82e41447743a6c40705f2f))
* **deps:** update radix-ui-primitives monorepo ([#2924](https://github.com/DanSnow/react-reversi/issues/2924)) ([60399f1](https://github.com/DanSnow/react-reversi/commit/60399f1beea38ac7d2b414d8a3c7e4b8e3c53307))
* **deps:** update react monorepo ([#2804](https://github.com/DanSnow/react-reversi/issues/2804)) ([cb6dc5d](https://github.com/DanSnow/react-reversi/commit/cb6dc5da8d9c25814c070af4cc05ddf8d79f9c7e))
* **deps:** update tanstack-router monorepo to v1.124.2 ([#3046](https://github.com/DanSnow/react-reversi/issues/3046)) ([357944d](https://github.com/DanSnow/react-reversi/commit/357944d5d57f1b7a7adf7a6ef5bb75e2dd482eb0))
* extract i18n ([c3f3cee](https://github.com/DanSnow/react-reversi/commit/c3f3ceeb5bfcbe9488c058fa93e7b248aaa1e21d))
* fix bug ([572d9e9](https://github.com/DanSnow/react-reversi/commit/572d9e9267dad1316b3b6e831c0846d2d6d26f74))
* fix dev ([71609b4](https://github.com/DanSnow/react-reversi/commit/71609b436af23d52496507b681cc13b5eab17ee3))
* fix game start issue ([9b1364d](https://github.com/DanSnow/react-reversi/commit/9b1364da6488484b4f8b18a7141f011d7b30f131))
* fix log ([7cc0d23](https://github.com/DanSnow/react-reversi/commit/7cc0d23e15481a970cffb76b5ffe090ca8c8d0dd))

1.9.0
=====

- let AI have basic overview of board status
- more AI version

1.8.0
=====

- add a minimax based AI
- refactor internal code & add tests

1.7.0
=====

- Fix overlay
- Add translation

1.6.2
=====

- Fix bug

1.6.1
=====

- Fix bug

1.6.0
=====

- Refine UI
- Add history

1.5.0
=====

- Improve(?) AI
- Support select AI version

1.4.0
=====

- UI

1.3.0
=====

- Upgrade depency
- Allow retract

1.2.1
=====

- Fix typo
- Update depency

1.2.0
=====

- Fix bugs
- More game mode

1.1.1
=====

- Add scroll to log

1.1.0
=====

- Add changelog
- Add log for game
