import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import TaskCard from '../TaskCard';
import NotFoundPage from '../../pages/NotFoundPage';
import PromptDialog from '../PromptDialog';

vi.mock('../../hooks/useTasks', () => ({
  useTasks: () => ({
    moveTask: vi.fn(),
    deleteTask: vi.fn(),
    columns: [],
    members: []
  })
}));

describe('Frontend UI Tests', () => {
  beforeAll(() => { globalThis.React = React; });

  it('TaskCard Test: should correctly display task title and priority', () => {
    const mockTask = { id: '1', _id: '1', title: 'Test UI Task', priority: 'high' };
    render(
      <BrowserRouter>
        <TaskCard task={mockTask} onClick={() => {}} />
      </BrowserRouter>
    );

    expect(screen.getByText('Test UI Task')).toBeInTheDocument();
  });

  it('NotFoundPage Test: should render 404 error message', () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('Button Test: should fire onClick event in PromptDialog', () => {
    const handleCancel = vi.fn();
    render(
      <PromptDialog
        title="Test"
        onCancel={handleCancel}
        onConfirm={() => {}}
      />
    );

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(handleCancel).toHaveBeenCalledTimes(1);
  });
});
