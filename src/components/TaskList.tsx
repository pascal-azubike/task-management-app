import { Table, Button, Tag, Space, Popconfirm, notification, Input } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { Task, Priority } from '../types/task';
import dayjs from 'dayjs';
import { useState } from 'react';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: number) => Promise<void>;
  loading: boolean;
}

const TaskList = ({ tasks, onEdit, onDelete, loading }: TaskListProps) => {
  const [searchText, setSearchText] = useState('');

  const getPriorityColor = (priority: Priority) => {
    const colors = {
      High: '#ef4444',
      Medium: '#faad14',
      Low: '#60a5fa',
    };
    return colors[priority];
  };

  const handleDelete = async (id: number) => {
    try {
      await onDelete(id);
      notification.success({
        message: 'Task deleted successfully!',
      });
    } catch (error) {
      notification.error({
        message: 'Error deleting task',
        description: 'Please try again later.',
      });
    }
  };

  // Filter tasks based on search text
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchText.toLowerCase()) ||
    task.priority.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'Task Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => (
        <div className="text-white font-medium whitespace-normal">{text}</div>
      ),
      sorter: (a: Task, b: Task) => a.title.localeCompare(b.title),
      width: '40%',
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: Priority) => (
        <Tag
          color={getPriorityColor(priority)}
          className="priority-tag"
          style={{
            background: `${getPriorityColor(priority)}20`,
            border: `1px solid ${getPriorityColor(priority)}`,
            color: getPriorityColor(priority)
          }}
        >
          {priority}
        </Tag>
      ),
      filters: [
        { text: 'High', value: 'High' },
        { text: 'Medium', value: 'Medium' },
        { text: 'Low', value: 'Low' },
      ],
      onFilter: (value: string | number | boolean, record: Task) => record.priority === value,
      width: '15%',
      align: 'center' as const,
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (date: string) => (
        <span className="text-zinc-300">{dayjs(date).format('MMM D, YYYY')}</span>
      ),
      sorter: (a: Task, b: Task) => dayjs(a.dueDate).unix() - dayjs(b.dueDate).unix(),
      width: '15%',
      align: 'center' as const,
    },
    {
      title: 'Status',
      dataIndex: 'completed',
      key: 'completed',
      render: (completed: boolean) => (
        <Tag
          className="status-tag"
          style={{
            background: completed ? '#10b98120' : '#ef444420',
            border: `1px solid ${completed ? '#10b981' : '#ef4444'}`,
            color: completed ? '#10b981' : '#ef4444'
          }}
        >
          {completed ? 'Completed' : 'Not Completed'}
        </Tag>
      ),
      filters: [
        { text: 'Completed', value: true },
        { text: 'Not Completed', value: false },
      ],
      onFilter: (value: string | number | boolean, record: Task) => record.completed === value,
      width: '20%',
      align: 'center' as const,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Task) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
            className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"
          />
          <Popconfirm
            title="Delete Task"
            description="Are you sure you want to delete this task?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ 
              className: 'bg-red-500 hover:bg-red-600 border-none',
              style: { boxShadow: '0 0 10px rgba(239, 68, 68, 0.3)' }
            }}
          >
            <Button
              type="text"
              icon={<DeleteOutlined />}
              className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
            />
          </Popconfirm>
        </Space>
      ),
      width: '10%',
      align: 'center' as const,
    },
  ];

  return (
    <div>
      <div className="mb-4">
        <Input
          placeholder="Search tasks by title or priority..."
          prefix={<SearchOutlined className="text-zinc-400" />}
          onChange={e => setSearchText(e.target.value)}
          className="search-input w-64"
          allowClear
        />
      </div>
      <Table
        columns={columns}
        dataSource={filteredTasks}
        rowKey="id"
        loading={loading}
        pagination={{
          position: ['bottom'],
          pageSize: 5,
          showSizeChanger: false,
        }}
      />
    </div>
  );
};

export default TaskList; 