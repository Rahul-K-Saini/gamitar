import React, { useState } from 'react';

interface CharacterSelectorProps {
  onSelect: (character: string) => void;
  isOpen: boolean;
}

export const CharacterSelector: React.FC<CharacterSelectorProps> = ({ onSelect, isOpen }) => {
  const [input, setInput] = useState('');
  
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.length === 1) {
      onSelect(input);
      setInput('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">
        <h2 className="text-xl font-bold mb-4">Select a Character</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={1}
            className="w-full p-2 border rounded mb-4"
            placeholder="Enter a single character"
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <button
              type="submit"
              disabled={input.length !== 1}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};