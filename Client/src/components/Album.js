import React from 'react';
import AlbumIndividual from './AlbumIndividual';

function Album() {
    return (
        <section className="contentBox">
            <h1>Albums</h1>
            <p>This page will an Album page.</p>
            <AlbumIndividual />
        </section>
    )
}

export default Album;