import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/Button';
import { RoleCard } from '@/components/studio/RoleCard';
import { useAuthStore } from '@/store/useAuthStore';
import { User, Users, Gavel } from 'lucide-react';

type UserRole = 'participant' | 'coordinator' | 'judge';

const roles = [
  {
    id: 'participant' as UserRole,
    title: 'Participant',
    description: 'Start your journey from taking part into hackathons and inviting friends to innovate great ideas',
    icon: <User size={48} className="text-studio-participant" />,
    variant: 'participant' as const
  },
  {
    id: 'coordinator' as UserRole,
    title: 'Hackathon Coordinator',
    icon: <Users size={48} className="text-studio-coordinator" />,
    variant: 'coordinator' as const
  },
  {
    id: 'judge' as UserRole,
    title: 'Judge',
    icon: <Gavel size={48} className="text-studio-judge" />,
    variant: 'judge' as const
  }
];

export default function SelectRole() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const navigate = useNavigate();
  const { setSelectedRole: setStoreRole } = useAuthStore();

  const handleContinue = () => {
    if (selectedRole) {
      setStoreRole(selectedRole);
      navigate('/start');
    }
  };

  return (
    <div className="min-h-screen bg-studio-bg-light flex flex-col">
      {/* Header */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-16">
        <div className="w-full max-w-md">
          {/* Title */}
          <h1 className="text-3xl font-bold text-studio-text-dark text-center mb-12">
            Let's Get Started With Your Role!
          </h1>

          {/* Role Cards */}
          <div className="space-y-4 mb-12">
            {roles.map((role) => (
              <RoleCard
                key={role.id}
                title={role.title}
                description={role.description}
                image={role.icon}
                selected={selectedRole === role.id}
                variant={role.variant}
                onClick={() => setSelectedRole(role.id)}
                className="w-full"
              />
            ))}
          </div>

          {/* Continue Button */}
          <Button
            onClick={handleContinue}
            disabled={!selectedRole}
            size="xl"
            className="w-full"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}