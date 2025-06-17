import { useEffect } from 'react';
import './LinguineoConversationWidget.css';

export default function LinguineoConversationWidget({ accessToken }) {
  const onConversationFinished = (e) => {
    console.log('Conversation finished', {e});
  };

  useEffect(() => {
    window.addEventListener('linguineo:end', onConversationFinished);

    return () => {
      window.removeEventListener('linguineo:end', onConversationFinished);
    };
  });
  
  return (
    <div className="linguineo-conversation-container">
      <linguineo-conversation
        access-token={accessToken}
        auth-method="bearer"
        additional-corrective-feedback="false"
        show-translations-in-conversation="false"
        always-wait-for-bot-to-finish-speaking="false"
        answer-type="SPEAKING_WITH_INTERMEDIATE_WRITING"
        application="SCOODLE_PLAY"
        do-additional-pronunciation-analysis="false"
        enable-contextualized-grammar-corrections="false"
        inline-feedback="true"
        language="fr"
        scenario-id="503"
        show-pronunciation-feedback="false"
        show-simple-corrective-feedback="false"
        sound-effects-enabled="false"
        tutor-language="nl"
        ui-theme="scoodle"
        user-photo-url="https://uploads.linguineo.com/applications/SCOODLE_PLAY/user.svg"
        bot-image-url="https://uploads.linguineo.com/applications/SCOODLE_PLAY/robot.svg"
      >
      </linguineo-conversation>
    </div>);
}
