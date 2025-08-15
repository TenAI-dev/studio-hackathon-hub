import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/Button';
import { HeaderBack } from '@/components/studio/HeaderBack';

export default function HackathonDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const hackathon = {
    id: id || '1',
    title: 'AI Innovation Challenge 2024',
    image: '/api/placeholder/400/200',
    date: 'March 15-17, 2024',
    location: 'San Francisco, CA',
    deadline: 'March 10, 2024',
    description: `Join us for the ultimate AI Innovation Challenge where brilliant minds come together to solve real-world problems using artificial intelligence and machine learning technologies.

This hackathon brings together developers, designers, data scientists, and entrepreneurs to create innovative AI solutions that can make a positive impact on society.`,
    agenda: [
      'Day 1: Registration, Team Formation & Idea Pitching',
      'Day 2: Development & Mentoring Sessions',
      'Day 3: Final Presentations & Judging'
    ],
    rules: [
      'Teams of 2-5 members maximum',
      'All code must be written during the event',
      'Open source libraries and APIs are allowed',
      'Projects must incorporate AI/ML technologies'
    ],
    eligibility: [
      'Students and professionals welcome',
      'Basic programming knowledge required',
      'Laptop and development environment setup',
      'Enthusiasm for AI and innovation'
    ],
    prizes: [
      '1st Place: $10,000 + Mentorship Program',
      '2nd Place: $5,000 + AWS Credits',
      '3rd Place: $2,500 + GitHub Pro',
      'Special Categories: Various sponsor prizes'
    ]
  };

  const handleRegister = () => {
    navigate('/registration', { 
      state: { hackathonId: hackathon.id, hackathonTitle: hackathon.title }
    });
  };

  return (
    <div className="min-h-screen bg-studio-bg-light">
      <HeaderBack 
        title="Hackathon Details"
        onBack={() => navigate('/home')}
      />
      
      <div className="px-6 py-6 max-w-4xl mx-auto">
        {/* Banner */}
        <div className="relative mb-6">
          <img 
            src={hackathon.image} 
            alt={hackathon.title}
            className="w-full h-48 object-cover rounded-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl" />
          <div className="absolute bottom-4 left-4 text-white">
            <h1 className="text-2xl font-bold mb-1">{hackathon.title}</h1>
            <p className="text-sm opacity-90">{hackathon.date} • {hackathon.location}</p>
          </div>
        </div>

        {/* Key Info */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-studio-bg-light rounded-lg">
              <h3 className="font-semibold text-studio-text-dark">Registration Deadline</h3>
              <p className="text-studio-orange font-medium mt-1">{hackathon.deadline}</p>
            </div>
            <div className="text-center p-4 bg-studio-bg-light rounded-lg">
              <h3 className="font-semibold text-studio-text-dark">Duration</h3>
              <p className="text-studio-text-muted mt-1">3 Days</p>
            </div>
            <div className="text-center p-4 bg-studio-bg-light rounded-lg">
              <h3 className="font-semibold text-studio-text-dark">Team Size</h3>
              <p className="text-studio-text-muted mt-1">2-5 Members</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <h2 className="text-xl font-bold text-studio-text-dark mb-4">Description</h2>
          <div className="text-studio-text-muted whitespace-pre-line leading-relaxed">
            {hackathon.description}
          </div>
        </div>

        {/* Agenda */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <h2 className="text-xl font-bold text-studio-text-dark mb-4">Agenda</h2>
          <ul className="space-y-3">
            {hackathon.agenda.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-studio-orange text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                  {index + 1}
                </span>
                <span className="text-studio-text-muted">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Rules */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <h2 className="text-xl font-bold text-studio-text-dark mb-4">Rules & Guidelines</h2>
          <ul className="space-y-2">
            {hackathon.rules.map((rule, index) => (
              <li key={index} className="flex items-start">
                <span className="text-studio-orange mr-2">•</span>
                <span className="text-studio-text-muted">{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Eligibility */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <h2 className="text-xl font-bold text-studio-text-dark mb-4">Eligibility</h2>
          <ul className="space-y-2">
            {hackathon.eligibility.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-studio-orange mr-2">•</span>
                <span className="text-studio-text-muted">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Prizes */}
        <div className="bg-white rounded-xl p-6 mb-20 shadow-sm">
          <h2 className="text-xl font-bold text-studio-text-dark mb-4">Prizes</h2>
          <div className="space-y-3">
            {hackathon.prizes.map((prize, index) => (
              <div key={index} className="p-4 bg-gradient-orange rounded-lg">
                <span className="text-white font-medium">{prize}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 safe-area-bottom">
        <div className="max-w-4xl mx-auto flex gap-3">
          <Button
            variant="secondary"
            size="lg"
            className="flex-1"
            onClick={() => navigate('/profile')}
          >
            Complete Your Profile
          </Button>
          <Button
            size="lg"
            className="flex-1"
            onClick={handleRegister}
          >
            Register Now
          </Button>
        </div>
      </div>
    </div>
  );
}