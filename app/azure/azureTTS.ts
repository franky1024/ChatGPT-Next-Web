import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import { showToast } from "../components/ui-lib";

const speechSynthesizeWithAzure = async (
  subscriptionKey: string,
  region: string,
  text: string,
  voiceName: string,
  language: string,
) => {
  console.time("Azure speech synthesis");
  const speechConfig = sdk.SpeechConfig.fromSubscription(
    subscriptionKey,
    region,
  );
  speechConfig.speechRecognitionLanguage = language;
  speechConfig.speechSynthesisVoiceName = voiceName;
  const player = new sdk.SpeakerAudioDestination();
  const audioConfig = sdk.AudioConfig.fromSpeakerOutput(player);
  const speechSynthesizer = new sdk.SpeechSynthesizer(
    speechConfig,
    audioConfig,
  );
  speechSynthesizer.speakTextAsync(
    text,
    (result) => {
      console.timeEnd("Azure speech synthesis");
      speechSynthesizer.close();
    },
    (error) => {
      console.log(error);
      showToast("Azure 语音合成错误");
      speechSynthesizer.close();
    },
  );
  return player;
};
export default speechSynthesizeWithAzure;
