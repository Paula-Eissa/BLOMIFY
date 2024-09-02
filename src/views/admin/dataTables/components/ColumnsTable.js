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
import { useEffect, useState } from 'react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

const columnHelper = createColumnHelper();

export default function ColumnTable() {
  const [data, setData] = React.useState([]);
  const [sorting, setSorting] = React.useState([]);
  const [newRow, setNewRow] = React.useState({
    name: '',
    type: '',
    country: '',
    image: '',
    category: '',
    description: '',
    colour: '',
    price: '',
  });
  const [editingRow, setEditingRow] = React.useState(null);
  const [editValues, setEditValues] = React.useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapShot = await getDocs(collection(db, 'products'));
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
      const docRef = await addDoc(collection(db, 'products'), newRow);
      setData([...data, { id: docRef.id, ...newRow }]);
      setNewRow({
        name: '',
        type: '',
        country: '',
        image: '',
        category: '',
        description: '',
        colour: '',
        price: '',
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
      const productRef = doc(db, 'products', id);
      await updateDoc(productRef, editValues);
      setData(data.map((item) => (item.id === id ? { ...item, ...editValues } : item)));
      setEditingRow(null);
      setEditValues({});
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  const handleDeleteRow = async (id) => {
    try {
      await deleteDoc(doc(db, 'products', id));
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
    columnHelper.accessor('type', {
      id: 'type',
      header: () => (
        <Text justifyContent="space-between" align="center" fontSize="12px" color="gray.400">
          TYPE
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('country', {
      id: 'country',
      header: () => (
        <Text justifyContent="space-between" align="center" fontSize="12px" color="gray.400">
          COUNTRY
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('image', {
      id: 'image',
      header: () => (
        <Text justifyContent="space-between" align="center" fontSize="12px" color="gray.400">
          IMAGE
        </Text>
      ),
      cell: (info) => (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          overflow="hidden"
          maxW="100px"
          maxH="100px"
        >
          <img src={info.getValue()} alt="product" style={{ maxWidth: '100%', maxHeight: '100%' }} />
        </Box>
      ),
    }),
    columnHelper.accessor('category', {
      id: 'category',
      header: () => (
        <Text justifyContent="space-between" align="center" fontSize="12px" color="gray.400">
          CATEGORY
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('description', {
      id: 'description',
      header: () => (
        <Text justifyContent="space-between" align="center" fontSize="12px" color="gray.400">
          DESCRIPTION
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700" maxW="200px" isTruncated>
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('colour', {
      id: 'colour',
      header: () => (
        <Text justifyContent="space-between" align="center" fontSize="12px" color="gray.400">
          COLOUR
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('price', {
      id: 'price',
      header: () => (
        <Text justifyContent="space-between" align="center" fontSize="12px" color="gray.400">
          PRICE
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
    // columnHelper.accessor('actions', {
    //   id: 'actions',
    //   header: () => (
    //     <Text justifyContent="space-between" align="center" fontSize="12px" color="gray.400">
    //       ACTIONS
    //     </Text>
    //   ),
    //   cell: (info) => {
    //     const row = info.row.original;
    //     return (
    //       <Flex justifyContent="space-between">
    //         <Button
    //           size="sm"
    //           colorScheme="teal"
    //           onClick={() => {
    //             setEditingRow(row.id);
    //             setEditValues(row);
    //           }}
    //         >
    //           Edit
    //         </Button>
    //         <IconButton
    //           size="sm"
    //           colorScheme="red"
    //           aria-label="Delete"
    //           icon={<DeleteIcon />}
    //           onClick={() => handleDeleteRow(row.id)}
    //         />
    //       </Flex>
    //     );
    //   },
    // }),
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
            <Input placeholder="Type" name="type" value={newRow.type} onChange={handleInputChange} mb="2" />
            <Input placeholder="Country" name="country" value={newRow.country} onChange={handleInputChange} mb="2" />
            <Input placeholder="Image URL" name="image" value={newRow.image} onChange={handleInputChange} mb="2" />
            <Input placeholder="Category" name="category" value={newRow.category} onChange={handleInputChange} mb="2" />
            <Input placeholder="Description" name="description" value={newRow.description} onChange={handleInputChange} mb="2" />
            <Input placeholder="Colour" name="colour" value={newRow.colour} onChange={handleInputChange} mb="2" />
            <Input placeholder="Price" name="price" value={newRow.price} onChange={handleInputChange} mb="2" />
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
                      <Input placeholder="Type" name="type" value={editValues.type || ''} onChange={handleEditChange} mb="2" />
                      <Input placeholder="Country" name="country" value={editValues.country || ''} onChange={handleEditChange} mb="2" />
                      <Input placeholder="Image URL" name="image" value={editValues.image || ''} onChange={handleEditChange} mb="2" />
                      <Input placeholder="Category" name="category" value={editValues.category || ''} onChange={handleEditChange} mb="2" />
                      <Input placeholder="Description" name="description" value={editValues.description || ''} onChange={handleEditChange} mb="2" />
                      <Input placeholder="Colour" name="colour" value={editValues.colour || ''} onChange={handleEditChange} mb="2" />
                      <Input placeholder="Price" name="price" value={editValues.price || ''} onChange={handleEditChange} mb="2" />
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



