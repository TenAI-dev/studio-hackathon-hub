import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/Button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useAuthStore } from '@/store/useAuthStore';
import heroCollaboration from '@/assets/hero-collaboration.jpg';

const hackathons = [
  {
    id: 1,
    title: "TenAI's Jalgaon Programmer's Day Hackathon 2025",
    date: "1st December",
    time: "9am - 1pm",
    location: "MJ ARTS Jalgaon",
    deadline: "18th September 2025",
    image: heroCollaboration,
    registrations: 156
  },
  {
    id: 2,
    title: "AI Innovation Challenge",
    date: "15th December", 
    time: "10am - 6pm",
    location: "Tech Hub Mumbai",
    deadline: "25th November 2025",
    image: heroCollaboration,
    registrations: 89
  }
];

export default function Home() {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { user, profileDraft } = useAuthStore();

  return (
    <div className="min-h-screen bg-studio-bg-light">
      {/* Header */}
      <div className="bg-white shadow-studio-soft px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-studio-text-muted">
            Welcome, {profileDraft.fullName?.split(' ')[0] || 'User'}
          </div>
          <div className="w-8 h-8 bg-studio-orange rounded-full"></div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-studio-text-muted" />
          <input
            type="text"
            placeholder="Search here"
            className="w-full h-12 pl-10 pr-4 rounded-full border border-gray-200 bg-studio-bg-light focus:outline-none focus:ring-2 focus:ring-studio-orange transition-studio"
          />
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Hero Card */}
        <Card className="mb-8 p-6 bg-gradient-orange text-studio-text-light shadow-studio-medium rounded-xl">
          <h2 className="text-2xl font-bold mb-2">Transform Ideas into Reality</h2>
          <p className="text-studio-text-light/90 mb-4">
            Join innovative hackathons and build solutions that matter.
          </p>
          <Button variant="whiteFilled" size="lg">
            Explore Now
          </Button>
        </Card>

        {/* Ongoing Hackathons */}
        <div>
          <h3 className="text-xl font-semibold text-studio-text-dark mb-4">
            Ongoing Hackathons
          </h3>

          <div className="space-y-4">
            {hackathons.map((hackathon) => (
              <Card
                key={hackathon.id}
                className="p-0 overflow-hidden cursor-pointer hover:shadow-studio-medium transition-studio"
                onClick={() => navigate(`/hackathon/${hackathon.id}`)}
              >
                <div className="flex">
                  {/* Image */}
                  <div className="w-24 h-24 bg-gray-200 flex-shrink-0">
                    <img
                      src={hackathon.image}
                      alt={hackathon.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4">
                    <h4 className="font-semibold text-studio-text-dark text-sm mb-2 line-clamp-2">
                      {hackathon.title}
                    </h4>

                    <div className="space-y-1 text-xs text-studio-text-muted">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>{hackathon.date} • {hackathon.time}</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <MapPin size={12} />
                        <span>{hackathon.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Users size={12} />
                        <span>{hackathon.registrations} registered</span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <Button size="sm" className="h-8 px-4 text-xs">
                        Register
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}