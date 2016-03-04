/**
 * Created by sudeep on 3/3/16.
 */
"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .factory("DocumentsService", documentsService);

    var documents = [
        {
            _id: 212,
            name: "MyDoc",
            collectionId: 12143},
        {
            _id: 213,
            name: "MyDoc2",
            collectionId: 12144
        }
    ];

    function documentsService() {

        var api = {
            createDocumentForCollection: createDocumentForCollection,
            findAllDocumentsForCollection: findAllDocumentsForCollection,
            deleteDocumentById: deleteDocumentById,
            updateDocumentById: updateDocumentById
        };
        return api;

        function createDocumentForCollection(collectionId, document, callback) {
            document._id = Math.floor(Math.random() * 900) + 100;
            document.collectionId = collectionId;
            documents.push(document);
            callback(document);
        }

        function findAllDocumentsForCollection(collectionId, callback) {
            var documentsForCollection = [];
            for(var i = 0; i < documents.length; i++) {
                if(documents[i].collectionId == collectionId){
                    documentsForCollection.push(documents[i]);
                }
            }
            callback(documentsForCollection)
        }

        function deleteDocumentById(documentId, callback) {
            var indexToRemove = -1;
            for(var i = 0 ; i < documents.length; i++) {
                if(documents[i]._id == documentId) {
                    indexToRemove = i;
                }
            }

            if(indexToRemove > -1) {
                documents.splice(indexToRemove, 1);
            }

            callback(documents);
        }

        function updateDocumentById(documentId, newDocument, callback) {
            for(var i = 0; i < documents.length; i++) {
                if(documents[i]._id == documentId) {
                    documents[i] = newDocument;
                    callback(newDocument);
                }
            }
        }

    }
})();
