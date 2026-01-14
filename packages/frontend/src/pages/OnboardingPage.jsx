// packages/frontend/src/pages/OnboardingPage.jsx
import ProfileSetup from "../components/Onboarding/ProfileSetup";
import IdeaInput from "../components/Onboarding/IdeaInput";

export default function OnboardingPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <ProfileSetup />
      <IdeaInput />
    </div>
  );
}
