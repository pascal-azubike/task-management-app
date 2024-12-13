
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import Table from 'antd/es/table';
import 'antd/es/table/style';

import Button from 'antd/es/button';
import 'antd/es/button/style';

import Tag from 'antd/es/tag';
import 'antd/es/tag/style';

import Space from 'antd/es/space';
import 'antd/es/space/style';

import Popconfirm from 'antd/es/popconfirm';
import 'antd/es/popconfirm/style';

import notification from 'antd/es/notification';
import 'antd/es/notification/style';

import Input from 'antd/es/input';
import 'antd/es/input/style';

import Tooltip from 'antd/es/tooltip';
import 'antd/es/tooltip/style';

import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';

import { Task, Priority } from '../types/task';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { taskService } from '../services/taskService';

/**
 * Displays all tasks in a table format with sorting and filtering capabilities.
 * Handles task data display, status updates, and deletion through the mock API.
 * Implements responsive design for various screen sizes.
 */

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  loading: boolean;
}

const TaskList = ({ tasks: initialTasks, onEdit, onDelete, loading }: TaskListProps) => {
  const [searchText, setSearchText] = useState('');
  const [tasks, setTasks] = useState(initialTasks);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });

  // Keep local tasks state in sync with props from parent
  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  // Fetch tasks whenever page number or page size changes
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data, total } = await taskService.getTasks(
          pagination.current,
          pagination.pageSize
        );
        setTasks(data);
        setPagination(prev => ({ ...prev, total }));
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [pagination.current, pagination.pageSize]);

  // Handle pagination changes from the table
  const handleTableChange = (newPagination: TablePaginationConfig) => {
    setPagination({
      current: newPagination.current || 1,
      pageSize: newPagination.pageSize || 10,
      total: pagination.total
    });
  };

  // Get the appropriate color for each priority level
  const getPriorityColor = (priority: Priority) => {
    const colors = {
      High: '#ef4444',    // Red for high priority
      Medium: '#faad14',  // Orange for medium priority
      Low: '#60a5fa',     // Blue for low priority
    };
    return colors[priority];
  };

  // Handle task deletion with success/error notifications
  const handleDelete = async (id: number) => {
    try {
      await onDelete(id);
      notification.success({
        message: 'Task deleted successfully!',
      });
    } catch (error) {
      notification.error({
        message: 'Failed to delete task',
        description: 'Please try again later.',
      });
    }
  };

  // Filter tasks based on search text (looks in title and priority)
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchText.toLowerCase()) ||
    task.priority.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<Task> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => (
        <Tooltip title={text} placement="topLeft">
          <div className="task-title-cell">{text}</div>
        </Tooltip>
      ),
      sorter: (a, b) => a.title.localeCompare(b.title),
      width: '30%',
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: Priority) => (
        <Tooltip title={`${priority} Priority Task`}>
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
        </Tooltip>
      ),
      filters: [
        { text: 'High', value: 'High' },
        { text: 'Medium', value: 'Medium' },
        { text: 'Low', value: 'Low' },
      ],
      onFilter: (value, record) => record.priority === value,
      width: '15%',
      align: 'center',
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (date: string) => (
        <Tooltip title={`Due on ${dayjs(date).format('MMMM D, YYYY')}`}>
          <span className="text-zinc-300 date-cell">{dayjs(date).format('MMM D, YYYY')}</span>
        </Tooltip>
      ),
      sorter: (a, b) => dayjs(a.dueDate).unix() - dayjs(b.dueDate).unix(),
      className: 'date-column',
      align: 'center',
    },
    {
      title: 'Status',
      dataIndex: 'completed',
      key: 'completed',
      render: (completed: boolean) => (
        <Tooltip title={completed ? 'Task Completed' : 'Task Not Completed'}>
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
        </Tooltip>
      ),
      filters: [
        { text: 'Completed', value: true },
        { text: 'Not Completed', value: false },
      ],
      onFilter: (value, record) => record.completed === value,
      width: '20%',
      align: 'center',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="Edit Task">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
              className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"
            />
          </Tooltip>
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
            <Tooltip title="Delete Task">
              <Button
                type="text"
                icon={<DeleteOutlined />}
                className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
      width: '10%',
      align: 'center',
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <Tooltip title="Search tasks by title or priority">
          <Input
            placeholder="Search tasks..."
            prefix={<SearchOutlined className="text-zinc-400" />}
            onChange={e => setSearchText(e.target.value)}
            className="search-input"
            allowClear
          />
        </Tooltip>
      </div>
      <Table
        columns={columns}
        dataSource={filteredTasks}
        rowKey="id"
        loading={loading}
        pagination={{
          ...pagination,
          showSizeChanger: true,
          showTotal: (total) => <span className="text-zinc-400">Total {total} tasks</span>,
        }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default TaskList; 