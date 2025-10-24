import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import SearchItem from '../src/components/SearchItem';
import '@testing-library/jest-dom';
import { describe, it, expect } from '@jest/globals';
import { Item } from '../src/types/Item';
import { AuthProvider } from '../src/contexts/AuthContext';
import { ReactNode } from 'react';

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn()
    })
}));

const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
});

// Mock Supabase
jest.mock('../src/utils/supabaseClient', () => ({
    supabase: {
        auth: {
            getUser: jest.fn().mockResolvedValue({ 
                data: { 
                    user: { 
                        id: 'test-user-id', 
                        email: 'test@example.com',
                        user_metadata: {
                            name: 'Test User',
                            role: 'admin'
                        }
                    } 
                } 
            }),
            onAuthStateChange: jest.fn().mockReturnValue({ data: { subscription: { unsubscribe: jest.fn() } } }),
        }
    }
}));

const TestWrapper = ({ children }: { children: ReactNode }) => {
    localStorageMock.getItem.mockReturnValue('mock-token');
    return <AuthProvider>{children}</AuthProvider>;
};

export const mockItems: Item[] = [
    {
      id: '1',
      name: 'mockItem',
      description: 'mockDescription',
      image: 'mockImage',
      quantity: 1,
      price: 1,
      created_by: 'mockUser',
      created_at: '2025-01-01T10:00:00Z',
    },
];

describe('SearchItem', () => {
  it('renders search input', async () => {
    await act(async () => {
      render(
        <TestWrapper>
          <SearchItem items={[]} />
        </TestWrapper>
      );
    });

    expect(screen.getByPlaceholderText('🔍 Search for a plant...')).toBeTruthy();
    expect(screen.getByText('Our Plant Collection')).toBeTruthy();
    
    await waitFor(() => {
      expect(screen.getByText('Add Plant')).toBeTruthy();
    });
  });

  it('renders search results', async () => {
    await act(async () => {
      render(
        <TestWrapper>
          <SearchItem items={mockItems} />
        </TestWrapper>
      );
    });

    expect(screen.getByText('mockItem')).toBeTruthy();
    expect(screen.getByText('mockDescription')).toBeTruthy();
  });
});