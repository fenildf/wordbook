const URL = 'https://www.iciba.com/index.php?a=getWordMean&c=search&word=';

import { Provider } from 'febrest';

function getMeaning(word) {
    return fetch(URL + word).then(function (response) {
        return response.json();
    }).then(json => {
        let {
            baesInfo,
            sentence,
            stems_affixes,
            ee_mean,
            error
        } = json;
        let symbols = baesInfo && baesInfo.symbols && baesInfo.symbols[0];
        let s, m, se, ee, sa,tr;
        if (symbols) {
            s = {
                en: symbols.ph_en,
                enVoice: symbols.ph_en_mp3,
                am: symbols.ph_am,
                amVoice: symbols.ph_am_mp3,
            };
            let parts = symbols.parts;
            if (parts) {
                m = parts.map(part => {
                    return {
                        part: part.part,
                        means: part.means
                    }
                });
            }
            tr = symbols.translate_result;

        }
        se = sentence && sentence.map(s => {
            let {
                tts_mp3,
                Network_en,
                Network_cn
            } = s;
            return {
                voice: tts_mp3,
                en: Network_en,
                cn: Network_cn
            }
        });
        ee = ee_mean && ee_mean.map(e => {
            let {
                part_name,
                means,
            } = e;
            return {
                part: part_name,
                means: means && means.map((mean) => {
                    let {
                        word_mean,
                        sentences
                    } = mean;
                    return {
                        mean: word_mean,
                        sentences: sentences && sentences.map(sentence => {
                            return sentence.sentence;
                        })
                    }
                })
            }
        });
        sa = stems_affixes && stems_affixes.map(item=>{
            let {
                type,
                type_value,
                type_exp,
                word_parts
            } = item;
            return {
                type,
                type_value,
                type_exp,
                word_parts
            }
        });
        return {s, m, se, ee, sa,tr,error};
    });
}
class MeaningProvider extends Provider {
    constructor(config) {
        super(config);
    }
    getState() {
        return getMeaning;
    }
    setState() {
        return;
    }
}

export default MeaningProvider;