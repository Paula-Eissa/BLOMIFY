import {
    Box,
    Flex,
    Text,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useColorModeValue,
    Input,
    Button,
    IconButton,
  } from '@chakra-ui/react';
  import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
  } from '@tanstack/react-table';
  import Card from 'components/card/Card';
  import Menu from 'components/menu/MainMenu';
  import * as React from 'react';
  import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
  import { db } from '../../../../firebase/firebase';
  import { useAuth } from '../../../../firebase/auth';
  import { useEffect, useState } from 'react';
  import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
  const columnHelper = createColumnHelper();
  
  export default function ColumnTable() {
    const [data, setData] = React.useState([]);
    const [sorting, setSorting] = React.useState([]);
    const [newRow, setNewRow] = React.useState({
      name: '',
      email: '',
      phone: '',
      password: ''
    });
    const [editingRow, setEditingRow] = React.useState(null);
    const [editValues, setEditValues] = React.useState({});
    const { changePassword } = useAuth();
    useEffect(() => {
      const fetchData = async () => {
        try {
          const querySnapShot = await getDocs(collection(db, 'users'));
          const dataQuery = querySnapShot.docs.map((element) => ({
            id: element.id,
            ...element.data(),
          }));
          setData(dataQuery);
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      };
      fetchData();
    }, []);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewRow({ ...newRow, [name]: value });
    };
  
    const handleAddRow = async () => {
      try {
        const docRef = await addDoc(collection(db, 'users'), newRow);
        setData([...data, { id: docRef.id, ...newRow }]);
        setNewRow({
          name: '',
          email: '',
          phone: '',
          password: ''
        });
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    };
  
    const handleEditChange = (e) => {
      const { name, value } = e.target;
      setEditValues({ ...editValues, [name]: value });
    };
  
    const handleUpdateRow = async (id) => {
      try {
        const userRef = doc(db, 'users', id);
        await updateDoc(userRef, editValues);
  
        // إذا تم تحديث كلمة المرور، نقوم بتحديثها في auth
        if (editValues.password) {
          await changePassword(editValues.password);
        }
  
        setData(data.map((item) => (item.id === id ? { ...item, ...editValues } : item)));
        setEditingRow(null);
        setEditValues({});
      } catch (error) {
        console.error('Error updating document: ', error);
      }
    };
  
    const handleDeleteRow = async (id) => {
      try {
        await deleteDoc(doc(db, 'users', id));
        setData(data.filter((item) => item.id !== id));
      } catch (error) {
        console.error('Error deleting document: ', error);
      }
    };
  
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  
    const columns = [
      columnHelper.accessor('name', {
        id: 'name',
        header: () => (
          <Text justifyContent="space-between" align="center" fontSize="12px" color="gray.400">
            NAME
          </Text>
        ),
        cell: (info) => (
          <Text color={textColor} fontSize="sm" fontWeight="700">
            {info.getValue()}
          </Text>
        ),
      }),
      columnHelper.accessor('email', {
        id: 'email',
        header: () => (
          <Text justifyContent="space-between" align="center" fontSize="12px" color="gray.400">
            Email
          </Text>
        ),
        cell: (info) => (
          <Text color={textColor} fontSize="sm" fontWeight="700">
            {info.getValue()}
          </Text>
        ),
      }),
      columnHelper.accessor('phone', {
        id: 'phone',
        header: () => (
          <Text justifyContent="space-between" align="center" fontSize="12px" color="gray.400">
            Phone
          </Text>
        ),
        cell: (info) => (
          <Text color={textColor} fontSize="sm" fontWeight="700">
            {info.getValue()}
          </Text>
        ),
      }),
      columnHelper.accessor('password', {
        id: 'password',
        header: () => (
          <Text justifyContent="space-between" align="center" fontSize="12px" color="gray.400">
            Password
          </Text>
        ),
        cell: (info) => (
          <Text color={textColor} fontSize="sm" fontWeight="700">
            {info.getValue()}
          </Text>
        ),
      }),
    ];
  
    const table = useReactTable({
      data,
      columns,
      state: {
        sorting,
      },
      onSortingChange: setSorting,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
    });
  
    return (
      <Card flexDirection="column" w="100%" px="0px" overflowX="auto">
        <Box w="100%" mb="4">
          <Flex direction="column" m="4">
            {/* <Text fontSize="lg" mb="2">Add New Product</Text> */}
            <Flex direction="column" mb="4">
              <Input placeholder="Name" name="name" value={newRow.name} onChange={handleInputChange} mb="2" />
              <Input placeholder="Email" name="email" value={newRow.email} onChange={handleInputChange} mb="2" />
              <Input placeholder="Phone" name="phone" value={newRow.phone} onChange={handleInputChange} mb="2" />
              <Input placeholder="Password" name="password" value={newRow.password} onChange={handleInputChange} mb="2" />
              <Button colorScheme="teal" onClick={handleAddRow}>Add</Button>
            </Flex>
          </Flex>
        </Box>
        <Box w="100%">
          <Table variant="simple" color="gray.500" mb="24px" mt="12px" w="100%">
            <Thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <Th
                      key={header.id}
                      colSpan={header.colSpan}
                      pe="10px"
                      borderColor={borderColor}
                      cursor="pointer"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <Flex justifyContent="space-between" align="center" fontSize="12px" color="gray.400">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: '',
                          desc: '',
                        }[header.column.getIsSorted()] ?? null}
                      </Flex>
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {table.getRowModel().rows.map((row) => (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <Td key={cell.id} fontSize="sm" p="10px" borderColor="transparent">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Td>
                  ))}
                  {editingRow === row.original.id ? (
                    <Td>
                      <Flex direction="column">
                        <Input placeholder="Name" name="name" value={editValues.name || ''} onChange={handleEditChange} mb="2" />
                        <Input placeholder="Email" name="email" value={editValues.email || ''} onChange={handleEditChange} mb="2" />
                        <Input placeholder="Phone" name="phone" value={editValues.phone || ''} onChange={handleEditChange} mb="2" />
                        <Input placeholder="Password" name="password" value={editValues.password || ''} onChange={handleEditChange} mb="2" />
                        {/* <Input placeholder="Category" name="category" value={editValues.category || ''} onChange={handleEditChange} mb="2" />
                        <Input placeholder="Description" name="description" value={editValues.description || ''} onChange={handleEditChange} mb="2" />
                        <Input placeholder="Colour" name="colour" value={editValues.colour || ''} onChange={handleEditChange} mb="2" />
                        <Input placeholder="Price" name="price" value={editValues.price || ''} onChange={handleEditChange} mb="2" /> */}
                        <Button colorScheme="teal" onClick={() => handleUpdateRow(row.original.id)}>Update</Button>
                      </Flex>
                    </Td>
                  ) : (
                    <Td>
                      <Button
                        size="sm"
                        colorScheme="teal"
                        onClick={() => {
                          setEditingRow(row.original.id);
                          setEditValues(row.original);
                        }}
                      >
                        Edit
                      </Button>
                      <IconButton
                        size="sm"
                        colorScheme="red"
                        aria-label="Delete"
                        icon={<DeleteIcon />}
                        onClick={() => handleDeleteRow(row.original.id)}
                        ml="2"
                      />
                    </Td>
                  )}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Card>
    );
  }
  
  
  
  