const { useState, useEffect } = React;
// Importar funciones de Firebase SDK (Estas líneas asumen que el SDK se carga desde CDN en index.html)
// Si utilizas un entorno de desarrollo con npm, estas líneas serían:
// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";

// Configuración de Firebase (REEMPLAZA CON TUS PROPIAS CREDENCIALES)
const firebaseConfig = {
    apiKey: "AIzaSyBCzsljc7TR_rIASvW4dBxdP3RzN98A-Z8",
    authDomain: "fechas-y-visitas.firebaseapp.com",
    projectId: "fechas-y-visitas",
    storageBucket: "fechas-y-visitas.firebasestorage.app",
    messagingSenderId: "913808797987",
    appId: "1:913808797987:web:067bfecc7660fd6a7cdc96"
};

// Inicializar Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const townsCollection = db.collection('towns');

const predefinedTownsList = [
    { name: 'UR 1' }, { name: 'UR 2' }, { name: 'UR 3' }, { name: 'UR 4' }, { name: 'UR 5' }, { name: 'UR 6' }, { name: 'UR 7' }, { name: 'UR 8' }, { name: 'UR 9' },
    { name: 'USE 1' }, { name: 'USE 2' }, { name: 'Oficina Principal' },
    { name: 'SUC 1' }, { name: 'SUC 2' }, { name: 'SUC 3' }, { name: 'SUC 4' }, { name: 'SUC 5' }, { name: 'SUC 6' }, { name: 'SUC 7' }, { name: 'SUC 8' }, { name: 'SUC 9' }, { name: 'SUC 10' }, { name: 'SUC 11' }, { name: 'SUC 12' }, { name: 'SUC 13' }, { name: 'SUC 14' }, { name: 'SUC 15' }, { name: 'SUC 16' }, { name: 'SUC 17' }, { name: 'SUC 18' }, { name: 'SUC 19' }, { name: 'SUC 20' }, { name: 'SUC 21' }, { name: 'SUC 22' },
    { name: 'AYORA UD/OT' }, { name: 'ENGUERA UD/OT' }, { name: 'LA FONT DE LA FIGUERA OT' }, { name: 'MOIXENT-MOGENTE UD/OT' },
    { name: 'ALBAIDA UD/OT' }, { name: 'BENIGANIM UD/OT' }, { name: 'BOCAIRENT OT' }, { name: 'ONTINYENT UD/OT' }, { name: 'AIELO DE MALFERIT OT' }, { name: 'ALCUDIA DE CRESPINS OT' }, { name: 'ALGEMESI UD/OT' }, { name: 'CANALS UD/OT' }, { name: 'CARCAIXENT UD/OT' }, { name: 'L\'OLLERIA OT' }, { name: 'XATIVA UD/OT' },
    { name: 'ALCASSER UD/OT' }, { name: 'ALGINET UD/OT' }, { name: 'CARLET UD/OT' }, { name: 'CATADAU OT' }, { name: 'PICASSENT UD/OT' },
    { name: 'ALBAL OT' }, { name: 'ALFAFAR-BENETUSSER UD/OT' }, { name: 'CATARROJA UD/OT S' }, { name: 'PAIPORTA UD/OT S' }, { name: 'PICANYA OT' },
    { name: 'ALMUSSAFES OT' }, { name: 'BENIFAIO UD/OT' }, { name: 'BENIPARRELL OT' }, { name: 'SILLA UD/OT' }, { name: 'SOLLANA OT' }, { name: 'SUECA UD/OT' },
    { name: 'CHELVA UD/OT' }, { name: 'CHESTE UD/OT' }, { name: 'CHIVA OT' }, { name: 'LLIRIA UD/OT' }, { name: 'VILLAR DEL ARZOBISPO OT' },
    { name: 'ALMOINES CSR' }, { name: 'GANDIA UD/OT S' }, { name: 'OLIVA UD/OT' }, { name: 'VILLALONGA OT' }, { name: 'GRAO DE GANDIA OT' },
    { name: 'CULLERA UD/OT S' }, { name: 'TAVERNES DE LA VALLDIGNA UD/OT' }, { name: 'XERACO OT' },
    { name: 'ALCIRA UD/OT' }, { name: 'GUADASSUAR OT' },
    { name: 'MANISES UD/OT' }, { name: 'PATERNA SUC 1 FUENTE DEL JARRO OT' }, { name: 'PATERNA SUC 2 LA CAÑADA OT' }, { name: 'PATERNA UD/OT S' }, { name: 'QUART DE POBLET UD/OT' },
    { name: 'BETERA UD/OT S' }, { name: 'BURJASSOT UD/OT' }, { name: 'GODELLA UD/OT' }, { name: 'NAQUERA OT' },
    { name: 'ALBORAIA UD/OT' }, { name: 'ALMASSERA OT' }, { name: 'FOIOS - ALBALAT DELS SORELLS OT' }, { name: 'LA POBLA DE FARNALS OT' }, { name: 'MASSAMAGRELL UD/OT S' }, { name: 'MELIANA UD/OT' }, { name: 'MUSEROS OT' }, { name: 'RAFELBUÑOL OT' }, { name: 'TAVERNES BLANQUES OT' },
    { name: 'ALBERIQUE UD/OT' }, { name: 'L\' ALCUDIA DE CARLET UD/OT' }, { name: 'LA POBLA LLARGA OT' }, { name: 'MANUEL OT' }, { name: 'VILLANUEVA DE CASTELLON UD/OT' },
    { name: 'PUERTO DE SAGUNT UD/OT' }, { name: 'PUIG OT' }, { name: 'SAGUNT/SAGUNTO UD/OT S' },
    { name: 'ALACUAS UD/OT' }, { name: 'ALDAIA UD/OT S' }, { name: 'MONTSERRAT OT' }, { name: 'TORRENTE UD/OT S' }, { name: 'TURIS OT' }, { name: 'XIRIVELLA UD/OT' },
    { name: 'BENAGUASIL OT' }, { name: 'LA POBLA DE VALLBONA UD/OT S' }, { name: 'L\'ELIANA UD/OT' }, { name: 'LLIRIA UD/OT S' }, { name: 'RIBARROJA DEL TURIA UD' }, { name: 'RIBARROJA DEL TURIA UD/OT S' }, { name: 'VILAMARXANT OT' },
    { name: 'SAN ANTONIO DE BENAGEBER' },
    { name: 'BUÑOL UD/OT' }, { name: 'REQUENA UD/OT' }, { name: 'UTIEL UD/OT' },
    { name: 'ADEMUZ UD/OT' },
    { name: 'CTA MAÑANA' }, { name: 'CTA TARDE' }, { name: 'CTA NOCHE' },
];

function App() {
    const [towns, setTowns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newTownName, setNewTownName] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddTownModal, setShowAddTownModal] = useState(false);
    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
    const [townToDelete, setTownToDelete] = useState(null);
    const [showEditTownModal, setShowEditTownModal] = useState(false);
    const [townToEdit, setTownToEdit] = useState(null);
    const [editTownName, setEditTownName] = useState('');
    const [editTownNotes, setEditTownNotes] = useState('');
    const [editTownManualDate, setEditTownManualDate] = useState('');
    const [showResetModal, setShowResetModal] = useState(false);
    const [resetPassword, setResetPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    useEffect(() => {
        const unsubscribe = townsCollection.onSnapshot(snapshot => {
            const townsData = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    visitHistory: data.visitHistory || [],
                    createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
                };
            });
            setTowns(townsData);
            setLoading(false);
        }, error => {
            console.error("Error fetching data: ", error);
            setLoading(false);
        });

        const metadataDoc = db.collection('metadata').doc('initStatus');
        metadataDoc.get().then(docSnapshot => {
            if (!docSnapshot.exists) {
                const batch = db.batch();
                predefinedTownsList.forEach(town => {
                    const newTownRef = townsCollection.doc();
                    batch.set(newTownRef, {
                        name: town.name,
                        visited: false,
                        notes: '',
                        visitHistory: [],
                        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
                    });
                });
                batch.set(metadataDoc, { initialized: true });
                batch.commit().then(() => {
                    console.log("Predefined towns added successfully.");
                }).catch(error => {
                    console.error("Error adding predefined towns: ", error);
                });
            }
        });

        return () => unsubscribe();
    }, []);

    const getLastVisit = (town) => {
        if (!town.visitHistory || town.visitHistory.length === 0) return null;
        const dates = town.visitHistory.map(d => d.toDate());
        return new Date(Math.max.apply(null, dates));
    };

    const handleMarkVisited = async (town) => {
        const newHistory = [...town.visitHistory];
        if (!town.visited) {
            newHistory.push(firebase.firestore.Timestamp.fromDate(new Date()));
        } else {
            const lastVisit = getLastVisit(town);
            if (lastVisit) {
                const indexToRemove = newHistory.findIndex(d => d.toDate().getTime() === lastVisit.getTime());
                if (indexToRemove > -1) {
                    newHistory.splice(indexToRemove, 1);
                }
            }
        }
        await townsCollection.doc(town.id).update({
            visited: newHistory.length > 0,
            visitHistory: newHistory
        });
    };

    const handleDeleteTown = async (townId) => {
        await townsCollection.doc(townId).delete();
        setShowDeleteConfirmationModal(false);
        setShowEditTownModal(false);
    };

    const handleEditTown = (town) => {
        setTownToEdit(town);
        setEditTownName(town.name);
        setEditTownNotes(town.notes || '');
        const lastVisit = getLastVisit(town);
        setEditTownManualDate(lastVisit ? lastVisit.toISOString().split('T')[0] : '');
        setShowEditTownModal(true);
    };

    const handleUpdateTown = async () => {
        if (!editTownName || !townToEdit) return;

        const manualDate = editTownManualDate ? new Date(editTownManualDate) : null;
        const newHistory = [...townToEdit.visitHistory];

        if (manualDate) {
            const dateExists = newHistory.some(d => d.toDate().toISOString().split('T')[0] === editTownManualDate);
            if (!dateExists) {
                newHistory.push(firebase.firestore.Timestamp.fromDate(manualDate));
            }
        }

        await townsCollection.doc(townToEdit.id).update({
            name: editTownName,
            notes: editTownNotes,
            visitHistory: newHistory,
            visited: newHistory.length > 0
        });

        setShowEditTownModal(false);
    };

    const handleAddTown = async () => {
        if (!newTownName) return;
        const newTown = {
            name: newTownName,
            visited: false,
            notes: '',
            visitHistory: [],
            createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        };
        await townsCollection.add(newTown);
        setNewTownName('');
        setShowAddTownModal(false);
    };

    const handleDownloadCSV = () => {
        const headers = ["Pueblo", "Visitado", "Última Visita", "Notas", "Historial Completo"];
        const rows = towns.map(town => {
            const history = town.visitHistory.map(d => d.toDate().toLocaleDateString('es-ES')).join(', ');
            return [
                `"${town.name.replace(/"/g, '""')}"`,
                town.visited ? "Sí" : "No",
                getLastVisit(town) ? getLastVisit(town).toLocaleDateString('es-ES') : "N/A",
                `"${(town.notes || "").replace(/"/g, '""')}"`,
                `"${history}"`
            ];
        });
        const csvContent = [headers.join(";"), ...rows.map(row => row.join(";"))].join("\n");
        const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "historial_visitas_valencia.csv";
        link.click();
        URL.revokeObjectURL(link.href);
    };

    const handleResetAllVisitedTowns = async () => {
        if (resetPassword !== "1980") {
            setPasswordError(true);
            return;
        }

        const visitedTownsSnapshot = await townsCollection.where('visited', '==', true).get();
        const batch = db.batch();
        visitedTownsSnapshot.forEach(doc => {
            batch.update(doc.ref, { visited: false, visitHistory: [] });
        });
        await batch.commit();

        setShowResetModal(false);
        setResetPassword('');
        setPasswordError(false);
    };
    
    const TownListItem = ({ town, isPrimaryAction = true }) => {
        const lastVisit = getLastVisit(town);
        return (
             <li className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-md">
               <div className="flex-grow mb-2 sm:mb-0">
                   <span className="font-semibold text-lg text-gray-800 dark:text-gray-200">{town.name}</span>
                   {town.notes && <p className="text-sm text-gray-500 dark:text-gray-400 italic mt-1">📝 {town.notes}</p>}
                   <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {lastVisit && (
                            <div>
                                <span className="font-bold">📅 Última Visita: </span>
                                {lastVisit.toLocaleDateString('es-ES')}
                            </div>
                        )}
                   </div>
               </div>
               <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 self-end sm:self-center">
                    {!town.visited ? (
                       <button onClick={() => handleMarkVisited(town)} className={`${isPrimaryAction ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'} text-white font-bold py-2 px-4 rounded-full shadow-md`}>Visitar</button>
                    ) : (
                        <button onClick={() => handleMarkVisited(town)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-md">No Visitado</button>
                    )}
                   <button onClick={() => handleEditTown(town)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-md">Editar</button>
               </div>
           </li>
        );
    };

    if (loading) return <div className="flex items-center justify-center min-h-screen bg-gray-100"><div className="text-xl font-semibold">Cargando...</div></div>;

    const sortedTowns = towns.length > 0 ? [...towns].sort((a, b) => {
        const lastVisitA = getLastVisit(a);
        const lastVisitB = getLastVisit(b);
        if (!lastVisitA && lastVisitB) return -1;
        if (lastVisitA && !lastVisitB) return 1;
        if (!lastVisitA && !lastVisitB) return a.name.localeCompare(b.name);
        return lastVisitA - lastVisitB;
    }) : [];

    const visitedTowns = filteredTowns.filter(town => town.visited).sort((a, b) => getLastVisit(b) - getLastVisit(a));
    
    // Nueva lógica de ordenamiento
    const getOldestVisitedTown = () => {
        const sortedVisited = [...visitedTowns].sort((a, b) => getLastVisit(a) - getLastVisit(b));
        return sortedVisited.length > 0 ? sortedVisited[0] : null;
    };

    let unvisitedTowns = filteredTowns.filter(town => !town.visited);
    const oldestVisited = getOldestVisitedTown();
    let next10UnvisitedTowns = [];

    if (oldestVisited) {
        // Encontramos el pueblo que era el más antiguo visitado
        const oldestVisitedPredefined = predefinedTownsList.find(t => t.name === oldestVisited.name);
        
        // Lo ponemos de primero en la lista de próximas visitas
        const newUnvisitedList = [oldestVisitedPredefined];

        // Añadimos el resto de pueblos no visitados ordenados alfabéticamente
        const otherUnvisited = unvisitedTowns.filter(town => town.name !== oldestVisited.name).sort((a, b) => a.name.localeCompare(b.name));
        next10UnvisitedTowns = [...newUnvisitedList, ...otherUnvisited].slice(0, 10);
        
    } else {
        // Si no hay pueblos visitados, mostramos los 10 primeros no visitados
        next10UnvisitedTowns = unvisitedTowns.slice(0, 10);
    }
    
    return (
        <div className="h-screen overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-950 text-gray-900 dark:text-gray-100 font-inter p-4 sm:p-6 md:p-8">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 sm:p-8 md:p-10 h-full flex flex-col">
                <div className="flex-shrink-0 mb-8">
                    <h1 className="text-4xl font-extrabold text-center text-gray-700 dark:text-gray-300 mb-6">📍 Gestor de Visitas S. LIBRE Valencia</h1>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </span>
                        <input type="text" placeholder="Buscar pueblo..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full p-3 pl-12 border border-gray-300 dark:border-gray-600 rounded-full focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-100 shadow-sm" />
                    </div>
                </div>

                <div className="flex-grow overflow-y-auto pr-2 -mr-2">
                    <div className="mb-10 p-6 bg-blue-50 dark:bg-blue-900 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-4">➡️ Próximas 10 Poblaciones por Visitar</h2>
                        {next10UnvisitedTowns.length > 0 ? <ul className="space-y-3">{next10UnvisitedTowns.map(town => <TownListItem key={town.id} town={town} isPrimaryAction={true} />)}</ul> : <p>No hay pueblos pendientes.</p>}
                    </div>

                    <div className="mb-10 p-6 bg-yellow-50 dark:bg-yellow-900 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-yellow-800 dark:text-yellow-200 mb-4">{`⚠️ Poblaciones Pendientes (${unvisitedTowns.length})`}</h2>
                        {unvisitedTowns.length > 0 ? <ul className="space-y-3">{unvisitedTowns.map(town => <TownListItem key={town.id} town={town} isPrimaryAction={false} />)}</ul> : <div className="text-center"><p>¡Enhorabuena! Has visitado todas las poblaciones.</p><button onClick={() => setShowResetModal(true)} className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full">Reiniciar Ciclo</button></div>}
                    </div>

                    <div className="mb-10 p-6 bg-green-50 dark:bg-green-900 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-4">{`✅ Poblaciones Visitadas (${visitedTowns.length})`}</h2>
                        {visitedTowns.length > 0 ? <ul className="space-y-3">{visitedTowns.map(town => <TownListItem key={town.id} town={town} />)}</ul> : <p>Aún no has visitado ningún pueblo.</p>}
                    </div>
                </div>

                <div className="text-center mt-8 flex-shrink-0 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <button onClick={() => setShowAddTownModal(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full shadow-lg">➕ Añadir Nuevo Pueblo</button>
                    <button onClick={handleDownloadCSV} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full shadow-lg">⬇️ Descargar Historial</button>
                </div>

                {showAddTownModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md">
                            <h3 className="text-2xl font-bold mb-4">Añadir Nuevo Pueblo</h3>
                            <input type="text" value={newTownName} onChange={(e) => setNewTownName(e.target.value)} className="w-full p-3 border rounded-md dark:bg-gray-700" placeholder="Nombre del Pueblo"/>
                            <div className="mt-6 flex justify-end space-x-3">
                                <button onClick={() => setShowAddTownModal(false)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full">Cancelar</button>
                                <button onClick={handleAddTown} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full">Añadir</button>
                            </div>
                        </div>
                    </div>
                )}

                {showEditTownModal && townToEdit && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md">
                            <h3 className="text-2xl font-bold mb-6 text-center">{`Editar: ${townToEdit.name}`}</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium">Nombre del Pueblo</label>
                                    <input type="text" value={editTownName} onChange={(e) => setEditTownName(e.target.value)} className="w-full p-3 border rounded-md dark:bg-gray-700"/>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Notas</label>
                                    <textarea value={editTownNotes} onChange={(e) => setEditTownNotes(e.target.value)} className="w-full p-3 border rounded-md dark:bg-gray-700" rows="3"/>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Añadir/Cambiar Fecha de Visita</label>
                                    <input type="date" value={editTownManualDate} onChange={(e) => setEditTownManualDate(e.target.value)} className="w-full p-3 border rounded-md dark:bg-gray-700"/>
                                </div>
                            </div>
                            <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
                                <button onClick={() => { setShowDeleteConfirmationModal(true); setTownToDelete(townToEdit); }} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">Eliminar Pueblo</button>
                                <div className="flex space-x-3 mt-4 sm:mt-0">
                                    <button onClick={() => setShowEditTownModal(false)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full">Cancelar</button>
                                    <button onClick={handleUpdateTown} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Guardar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {showDeleteConfirmationModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl text-center">
                            <h3 className="text-xl font-bold mb-4">{`¿Seguro que quieres eliminar "${townToDelete?.name}"?`}</h3>
                            <p>Esta acción no se puede deshacer.</p>
                            <div className="mt-6 flex justify-center space-x-4">
                                <button onClick={() => setShowDeleteConfirmationModal(false)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full">Cancelar</button>
                                <button onClick={() => handleDeleteTown(townToDelete.id)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">Eliminar</button>
                            </div>
                        </div>
                    </div>
                )}

                {showResetModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-sm text-center">
                            <h3 className="text-xl font-bold mb-4">Confirmar Reinicio de Ciclo</h3>
                            <p className="mb-4">Introduce la contraseña para continuar:</p>
                            <input
                                type="password"
                                value={resetPassword}
                                onChange={(e) => {
                                    setResetPassword(e.target.value);
                                    setPasswordError(false);
                                }}
                                className={`w-full p-3 border rounded-md dark:bg-gray-700 text-center ${passwordError ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Contraseña"
                            />
                            {passwordError && <p className="text-red-500 text-sm mt-2">Contraseña incorrecta. Inténtalo de nuevo.</p>}
                            <div className="mt-6 flex justify-center space-x-3">
                                <button onClick={() => setShowResetModal(false)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full">Cancelar</button>
                                <button onClick={handleResetAllVisitedTowns} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full">Confirmar</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
