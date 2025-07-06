  import React, { useState, useEffect, useRef, useCallback } from 'react';
  import { 
    ChevronDown, 
    Plus, 
    Search, 
    Filter, 
    Download, 
    Share2, 
    MoreHorizontal,
    EyeOff,
    ArrowUpDown,
    Import,
    Upload,
    Bell,
    User,
    FileText,
    Calendar,
    Users,
    Link,
    Flag,
    DollarSign
  } from 'lucide-react';

  interface SpreadsheetRow {
    id: number;
    jobRequest: string;
    submitted: string;
    status: 'In-progress' | 'Need to start' | 'Complete' | 'Blocked';
    submitter: string;
    url: string;
    assigned: string;
    priority: 'Medium' | 'High' | 'Low';
    dueDate: string;
    estValue: string;
  }

  const initialData: SpreadsheetRow[] = [
    {
      id: 1,
      jobRequest: "Launch social media campaign for pro...",
      submitted: "15-11-2024",
      status: "In-progress",
      submitter: "Aisha Patel",
      url: "www.aishapatel...",
      assigned: "Sophie Choudhury",
      priority: "Medium",
      dueDate: "20-11-2024",
      estValue: "6,200,000"
    },
    {
      id: 2,
      jobRequest: "Update press kit for company redesign",
      submitted: "28-10-2024",
      status: "Need to start",
      submitter: "Irfan Khan",
      url: "www.irfankhan...",
      assigned: "Tejas Pandey",
      priority: "High",
      dueDate: "30-10-2024",
      estValue: "3,500,000"
    },
    {
      id: 3,
      jobRequest: "Finalize user testing feedback for app...",
      submitted: "05-12-2024",
      status: "In-progress",
      submitter: "Mark Johnson",
      url: "www.markjohns...",
      assigned: "Rachel Lee",
      priority: "Medium",
      dueDate: "10-12-2024",
      estValue: "4,750,000"
    },
    {
      id: 4,
      jobRequest: "Design new features for the website",
      submitted: "10-01-2025",
      status: "Complete",
      submitter: "Emily Green",
      url: "www.emilygreen...",
      assigned: "Tom Wright",
      priority: "Low",
      dueDate: "15-01-2025",
      estValue: "5,800,000"
    },
    {
      id: 5,
      jobRequest: "Prepare financial report for Q4",
      submitted: "25-01-2025",
      status: "Blocked",
      submitter: "Jessica Brown",
      url: "www.jessicabro...",
      assigned: "Kevin Smith",
      priority: "Low",
      dueDate: "30-01-2025",
      estValue: "2,800,000"
    }
  ];

  const SpreadsheetApp: React.FC = () => {
    const [data, setData] = useState<SpreadsheetRow[]>(initialData);
    const [selectedCell, setSelectedCell] = useState<{row: number, col: string} | null>(null);
    const [editingCell, setEditingCell] = useState<{row: number, col: string} | null>(null);
    const [editValue, setEditValue] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleCellClick = (rowIndex: number, column: string) => {
      setSelectedCell({row: rowIndex, col: column});
    };

    const handleCellDoubleClick = (rowIndex: number, column: string, currentValue: string) => {
      setEditingCell({row: rowIndex, col: column});
      setEditValue(currentValue);
    };

    const handleCellEdit = (value: string) => {
      setEditValue(value);
    };

    const handleCellSave = () => {
      if (editingCell) {
        setEditingCell(null);
        setEditValue('');
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleCellSave();
      } else if (e.key === 'Escape') {
        setEditingCell(null);
        setEditValue('');
      }
    };

    useEffect(() => {
      if (editingCell && inputRef.current) {
        inputRef.current.focus();
      }
    }, [editingCell]);

    const getStatusBadge = (status: string) => {
    const iconProps = "w-5 h-5";

    const statusIcons: Record<string, JSX.Element> = {
      "In-progress": (
          <img src="/images/Status (2).png" alt="Logo" className="w-18 h-18 object-contain" />

      ),
      "Need to start": (
              <img src="/images/Status (3).png" alt="Logo" className="w-18 h-18 object-contain" />

      ),
      "Complete": (
              <img src="/images/Status.png" alt="Logo" className="w-18 h-18 object-contain" />

      ),
      "Blocked": (
              <img src="/images/Status (1).png" alt="Logo" className="w-18 h-18 object-contain" />

      ),
    };

    return (
      <div className="flex items-center justify-center">
        {statusIcons[status] ?? <span className="text-xs text-gray-500">Unknown</span>}
      </div>
    );
  };
      const getPriorityBadge = (priority: string) => {
      const priorityStyles = {
        'High': 'bg-red-50 text-red-700',
        'Medium': 'bg-amber-50 text-amber-700',
        'Low': 'bg-blue-50 text-blue-700'
      };
      
      return (
        <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${priorityStyles[priority as keyof typeof priorityStyles]}`}>
          {priority}
        </span>
      );
    };

    const renderCell = (
  value: string, 
  rowIndex: number, 
  column: string, 
  type: 'text' | 'status' | 'priority' | 'url' | 'currency' = 'text',
  rightAlign: boolean = false
) => {

      const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === column;
      const isEditing = editingCell?.row === rowIndex && editingCell?.col === column;
      
      if (isEditing) {
        return (
          <input
            ref={inputRef}
            value={editValue}
            onChange={(e) => handleCellEdit(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleCellSave}
            className="w-full h-full bg-white border-2 border-blue-500 px-2 py-1 text-xs focus:outline-none"
          />
        );
      }

      let content;
switch (type) {
  case 'status':
    content = getStatusBadge(value);
    break;
  case 'priority':
    content = getPriorityBadge(value);
    break;
  case 'url':
    content = <span className="text-blue-600 underline text-xs truncate">{value}</span>;
    break;
  case 'currency':
    content = (
      <div className="flex items-center justify-end space-x-1 w-full">
        <span className="text-xs text-gray-900 truncate">{value}</span>
        <img src="/images/₹.png" alt="₹" className="w-3 h-3 object-contain" />
      </div>
    );
    break;
  default:
    content = <span className="text-xs text-gray-900 truncate">{value}</span>;
}


      return (
  <div
    className={`w-full h-full px-3 py-2 cursor-cell hover:bg-gray-50 flex items-center ${
      isSelected ? 'bg-blue-50 ring-1 ring-blue-500' : ''
    } ${rightAlign ? 'justify-end text-right' : ''}`}
    onClick={() => handleCellClick(rowIndex, column)}
    onDoubleClick={() => handleCellDoubleClick(rowIndex, column, value)}
  >
    {content}
  </div>
);

    };

    const renderAddCell = () => {
      return (
        <div className="w-full h-full px-3 py-2 cursor-pointer hover:bg-gray-50 flex items-center justify-center">
          <Plus className="w-3 h-3 text-gray-400" />
        </div>
      );
    };

  const rowsPerScreen = Math.floor((window.innerHeight - 150) / 40);
  const totalRows = Math.max(rowsPerScreen, data.length);
  const emptyRows = totalRows - data.length;

    return (
      <div className="h-screen bg-gray-50 flex flex-col">
        <div className="bg-white border-b border-gray-200 px-4 py-2 flex-shrink-0 h-12">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center space-x-2">
              <img src="/images/Panel.png" alt="Logo" className="w-6   h-6 object-contain" />
              <span className="text-gray-400 text-xs font-semibold">Workspace</span>
              <img src="/images/Chevron.png" alt="Logo" className="w-3 h-3 object-contain" />
              <span className="text-gray-400 text-xs font-semibold">Folder 2</span>
              <img src="/images/Chevron.png" alt="Logo" className="w-3 h-4 object-contain" />
              <span className="text-gray-900 font-medium text-xs font-semibold">Spreadsheet 3</span>
              <img src="/images/More.png" alt="Logo" className="w-5 h-4 object-contain" />
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="w-3 h-3 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-300 font-semibold" />
                <input
                  type="text"
                  placeholder="Search within sheet"
                  className="pl-8 pr-3 py-1 border border-gray-300 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48"
                />
              </div>
              
              <div className="relative">
                <img src="/images/Notification_bell.png" alt="Logo" className="w-10 h-10 object-contain" />
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                  <img src="/images/Ellipse 1.png" alt="Logo" className="w-8 h-8 object-contain" />
                </div>
                <div className="text-xs">
                  <div className="font-medium text-gray-900">John Doe</div>
                  <div className="text-gray-400 font-medium text-xxs">john.doe...</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Toolbar - Height: 40px */}
        <div className="bg-white border-b border-gray-200 px-4 py-1 flex-shrink-0 h-10">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <span className="text-xs text-gray-700 font-medium">Tool bar</span>
                <img src="/images/Chevron Double.png" alt="Logo" className="w-5 h-4 object-contain" />
              </div>
              
              <div className="flex items-center space-x-1">
                <button className="flex items-center space-x-1 px-2 py-1 text-xs text-gray-800 hover:bg-gray-100 rounded">
                  <EyeOff className="w-3 h-3" />
                  <span>Hide fields</span>
                </button>
                
                <button className="flex items-center space-x-1 px-2 py-1 text-xs text-gray-800 hover:bg-gray-100 rounded">
                  <ArrowUpDown className="w-3 h-3" />
                  <span>Sort</span>
                </button>
                
                <button className="flex items-center space-x-1 px-2 py-1 text-xs text-gray-800 hover:bg-gray-100 rounded">
                  <img src="/images/Filter.png" alt="Logo" className="w-5 h-4 object-contain" />
                  <span>Filter</span>
                </button>
                
                <button className="px-2 py-1 text-xs text-gray-800 hover:bg-gray-100 rounded flex item center">
                  <img src="/images/Arrow Autofit.png" alt="Logo" className="w-5 h-4 object-contain" />
                  Cell view
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-1">
              <button className="flex items-center space-x-1 px-2 py-1.5 text-xs text-gray-700 hover:bg-white rounded border border-gray-200">
                <img src="/images/Shape (2).png" alt="Logo" className="w-3 h-3 object-contain" />
                <span>Import</span>
              </button>
              
              <button className="flex items-center space-x-1 px-2 py-1.5 text-xs text-gray-700 hover:bg-white rounded border border-gray-200">
                <img src="/images/Shape (1).png" alt="Logo" className="w-3 h-3 object-contain" />
                <span>Export</span>
              </button>
              
              <button className="flex items-center space-x-1 px-2 py-1.5 text-xs text-gray-700 hover:bg-white rounded border border-gray-200">
                <img src="/images/Share.png" alt="Logo" className="w-3 h-3 object-contain" />
                <span>Share</span>
              </button>
              
              <button className="flex items-center space-x-1 px-3 py-2 bg-[#4B6A4F] text-white text-xs rounded hover:bg-green-700 font-medium">
                <img src="/images/Arrow Split.png" alt="Logo" className="w-4 h-4 object-contain" />
                <span>New Action</span>
              </button>
            </div>
          </div>
        </div>

      

        {/* Scrollable Spreadsheet Container ka */}
        <div className="flex-1 overflow-auto bg-white">
          <div className="w-full h-full overflow-x-auto">
            <div className="min-w-full max-w-[1440px] w-full mx-auto">
              <table className="min-w-full table-fixed border-collapse">
                <thead className="sticky top-0 z-10 bg-gray-50">
                <tr>
    <th className="bg-white px-1 py-1 border-r border-gray-300">
      <div className="inline-flex items-center">
        <img src="/images/Blank cell.png" alt="Logo" className="w-4 h-4 object-contain" />
      </div>
    </th>

    <th className="bg-[#E2E2E2] px-1 py-1 text-left border-r border-gray-300" colSpan={4}>
      <div className="inline-flex items-center space-x-1 px-2 py-1 bg-[#EEEEEE] rounded-md shadow-sm">
        <img src="/images/Link.png" alt="Logo" className="w-4 h-4 object-contain" />
        <span className="text-xs font-medium text-gray-800">Q3 Financial Overview</span>
      </div>
    </th>

   

    <th className="bg-white border-r border-gray-200"></th> 
    <th className="bg-[#D2E0D4] px-2 py-1 text-left border-r border-gray-200" colSpan={1}>
      <div className="flex items-center space-x-1">
        <img src="/images/Arrow Split.png" alt="Logo" className="w-4 h-4 object-contain" />
        <span className="text-xs font-semibold text-center text-grey-900">ABC</span>
        <img src="/images/More.png" alt="Logo" className="w-4 h-4 object-contain" />
      </div>
    </th>
    <th className="bg-[#DCCFFC] px-2 py-1 text-left border-r border-gray-200" colSpan={2}>
      <div className="flex items-center space-x-1">
        <img src="/images/Arrow Split.png" alt="Logo" className="w-4 h-4 object-contain" />
        <span className="text-xs font-semibold text-grey-900">Answer a question</span>
        <img src="/images/More.png" alt="Logo" className="w-4 h-4 object-contain" />
      </div>
    </th>
    <th className="bg-[#FAC2AF] px-2 py-1 text-left border-r border-gray-200" colSpan={1}>
      <div className="flex items-center space-x-1">
        <img src="/images/Arrow Split.png" alt="Logo" className="w-4 h-4 object-contain" />
        <span className="text-xs font-semibold text-grey-900">Extract</span>
        <img src="/images/More.png" alt="Logo" className="w-4 h-4 object-contain" />
      </div>
    </th>
    <th className="bg-[#EEEEEE] px-2 py-1 text-center">
      <Plus className="w-5 h-5 text-gray-900 mx-auto" />
    </th>
  </tr>


                  <tr>
                    <th className=" w-12 px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 bg-[#EEEEEE]">#</th>
                    <th className=" bg-[#EEEEEE] px-2 py-2 text-left text-xs font-medium text-black tracking-wider border-r border-white " style={{minWidth: '200px'}}>
                      <div className="flex items-center space-x-1">
                      <div className="inline-flex item-center"><img src="/images/Briefcase.png" alt="Logo" className="w-4 h-4 object-contain" /></div>

                        <span>Job Request</span>
                        <ChevronDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th className="bg-[#EEEEEE] px-2 py-2 text-left text-xs font-medium text-black  tracking-wider border-r border-white " style={{minWidth: '100px'}}>
                      <div className="flex items-center space-x-1">
                        <img src="/images/Calendar.png" alt="Logo" className="w-4 h-4 object-contain" />
                        <span>Submitted</span>
                        <ChevronDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th className="bg-[#EEEEEE] px-2 py-2 text-left text-xs font-medium text-black tracking-wider border-r border-white " style={{minWidth: '120px'}}>
                      <div className="flex items-center space-x-1">
                        <img src="/images/Calendar.png" alt="Logo" className="w-4 h-4 object-contain" />
                        <span>Status</span>
                        <ChevronDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th className="bg-[#EEEEEE] px-2 py-2 text-left text-xs font-medium text-black tracking-wider border-r border-white" style={{minWidth: '120px'}}>
                      <div className="flex items-center space-x-1">
                        <img src="/images/Person.png" alt="Logo" className="w-4 h-4 object-contain" />
                        <span>Submitter</span>
                        <ChevronDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th className="bg-[#EEEEEE] px-2 py-2 text-left text-xs font-medium text-gray-black tracking-wider border-r border-white bg-gray-50" style={{minWidth: '120px'}}>
                      <div className="flex items-center space-x-1">
                        <img src="/images/Globe.png" alt="Logo" className="w-4 h-4 object-contain" />
                        <span>URL</span>
                        <ChevronDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th className="bg-[#E8F0E9] px-2 py-2 text-left text-xs font-medium text-gray-black tracking-wider border-r border-white " style={{minWidth: '120px'}}>
                      <div className="flex items-center space-x-1">
                        <img src="/images/Emoji.png" alt="Logo" className="w-4 h-4 object-contain" />
                        <span>Assigned</span>
                        <ChevronDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th className="bg-[#EAE3FC] px-2 py-2 text-left text-xs font-medium text-black tracking-wider border-r border-white" style={{minWidth: '90px'}}>
                      <div className="flex items-center space-x-1">
                        
                        <span>Priority</span>
                        
                      </div>
                    </th>
                    <th className="bg-[#EAE3FC] px-2 py-2 text-left text-xs font-medium text-black tracking-wider border-r border-white " style={{minWidth: '100px'}}>
                      <div className="flex items-center space-x-1">
                        
                        <span>Due Date</span>
                        
                      </div>
                    </th>
                    <th className="bg-[#FFE9E0] px-2 py-2 text-left text-xs font-medium text-black tracking-wider border-r border-white " style={{minWidth: '100px'}}>
                      <div className="flex items-center space-x-1">
                        
                        <span>Est. Value</span>
                        
                      </div>
                    </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 bg-gray-50" style={{minWidth: '80px'}}>
    <div className="flex items-center justify-center">
      
    </div>
  </th>
                      

                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {data.map((row, index) => (
                    <tr key={row.id} className="hover:bg-gray-50 h-10">
                      <td className="w-12 px-2 py-2 text-xs text-gray-500 border-r border-gray-100 bg-gray-50">{row.id}</td>
                      <td className="border-r border-gray-100 h-10">{renderCell(row.jobRequest, index, 'jobRequest')}</td>
                      <td className="border-r border-gray-100 h-10">{renderCell(row.submitted, index, 'submitted')}</td>
                      <td className="border-r border-gray-100 h-10">{renderCell(row.status, index, 'status', 'status')}</td>
                      <td className="border-r border-gray-100 h-10">{renderCell(row.submitter, index, 'submitter')}</td>
                      <td className="border-r border-gray-100 h-10">{renderCell(row.url, index, 'url', 'url')}</td>
                      <td className="border-r border-gray-100 h-10">{renderCell(row.assigned, index, 'assigned')}</td>
                      <td className="border-r border-gray-100 h-10">{renderCell(row.priority, index, 'priority', 'priority')}</td>
                      <td className="border-r border-gray-100 h-10 text-right pr-4">{renderCell(row.dueDate, index, 'dueDate', 'text', true)}</td>
<td className="border-r border-gray-100 h-10 text-right pr-4">{renderCell(row.estValue, index, 'estValue', 'currency')}</td>

                      <td className="h-10"><div className="px-2 py-2 h-full"></div></td>

                    </tr>
                  ))}
                  
                  {[...Array(emptyRows)].map((_, index) => (
                    <tr key={`empty-${index}`} className="hover:bg-gray-50 h-10">
                      <td className="w-12 px-2 py-2 text-xs text-gray-500 border-r border-gray-100 bg-gray-50">{data.length + 1 + index}</td>
                      <td className="border-r border-gray-100 h-10"><div className="px-2 py-2 h-full"></div></td>
                      <td className="border-r border-gray-100 h-10"><div className="px-2 py-2 h-full"></div></td>
                      <td className="border-r border-gray-100 h-10"><div className="px-2 py-2 h-full"></div></td>
                      <td className="border-r border-gray-100 h-10"><div className="px-2 py-2 h-full"></div></td>
                      <td className="border-r border-gray-100 h-10"><div className="px-2 py-2 h-full"></div></td>
                      <td className="border-r border-gray-100 h-10"><div className="px-2 py-2 h-full"></div></td>
                      <td className="border-r border-gray-100 h-10"><div className="px-2 py-2 h-full"></div></td>
                      <td className="border-r border-gray-100 h-10"><div className="px-2 py-2 h-full"></div></td>
                      <td className="border-r border-gray-100 h-10"><div className="px-2 py-2 h-full"></div></td>
                      <td className="h-10"><div className="px-2 py-2 h-full"></div></td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Bottom vala Tabs Section */}
        <div className="bg-white border-t border-gray-200 px-4 py-1 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-700">All Orders</span>
            </div>
            <span className="text-gray-400">|</span>
            <span className="text-xs text-gray-500">Pending</span>
            <span className="text-xs text-gray-500">Reviewed</span>
            <span className="text-xs text-gray-500">Arrived</span>
            <button className="ml-auto p-1 hover:bg-gray-100 rounded">
              <Plus className="w-3 h-3 text-gray-800" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default SpreadsheetApp;