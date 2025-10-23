class MinecraftGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.world = [];
        this.player = {
            x: 0,
            y: 0,
            z: 20,
            rotation: 0,
            pitch: 0,
            velocityY: 0,
            onGround: false
        };
        this.keys = {};
        this.mouse = { x: 0, y: 0 };
        this.selectedBlock = 'air';
        this.blockSize = 32;
        this.worldSize = 20;
        this.gravity = 0.5;
        this.jumpPower = 10;
        
        this.init();
    }

    init() {
        this.setupCanvas();
        this.generateWorld();
        this.setupEventListeners();
        this.setupMenu();
        this.gameLoop();
    }

    setupCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    generateWorld() {
        // Gerar terreno simples
        for (let x = 0; x < this.worldSize; x++) {
            this.world[x] = [];
            for (let z = 0; z < this.worldSize; z++) {
                this.world[x][z] = [];
                
                // Altura base do terreno
                const height = 5 + Math.sin(x * 0.3) * 2 + Math.cos(z * 0.3) * 2;
                
                for (let y = 0; y < 10; y++) {
                    if (y < height - 2) {
                        this.world[x][z][y] = 'stone';
                    } else if (y < height) {
                        this.world[x][z][y] = 'dirt';
                    } else if (y === Math.floor(height)) {
                        this.world[x][z][y] = 'grass';
                    } else if (y === Math.floor(height) + 1 && Math.random() > 0.7) {
                        this.world[x][z][y] = 'wood';
                    }
                }
            }
        }
    }

    setupEventListeners() {
        // Teclado
        document.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;
            
            // Abrir/fechar inventário
            if (e.key === 'e' || e.key === 'E') {
                document.getElementById('inventory').classList.toggle('hidden');
                e.preventDefault();
            }
        });

        document.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });

        // Mouse
        this.canvas.addEventListener('mousemove', (e) => {
            if (!document.pointerLockElement) return;
            
            this.player.rotation -= e.movementX * 0.003;
            this.player.pitch -= e.movementY * 0.003;
            this.player.pitch = Math.max(-Math.PI/2, Math.min(Math.PI/2, this.player.pitch));
        });

        this.canvas.addEventListener('click', (e) => {
            if (!document.pointerLockElement) {
                this.canvas.requestPointerLock();
                return;
            }

            const block = this.getTargetBlock();
            if (block) {
                if (e.button === 0) { // Clique esquerdo - quebrar
                    this.breakBlock(block.x, block.y, block.z);
                } else if (e.button === 2) { // Clique direito - colocar
                    this.placeBlock(block.x, block.y, block.z);
                }
            }
        });

        this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());

        // Inventário
        document.querySelectorAll('.slot').forEach(slot => {
            slot.addEventListener('click', (e) => {
                document.querySelectorAll('.slot').forEach(s => s.classList.remove('active'));
                slot.classList.add('active');
                this.selectedBlock = slot.dataset.block;
                document.getElementById('selectedBlock').textContent = 
                    `Bloco selecionado: ${slot.textContent}`;
            });
        });

        // Redimensionamento
        window.addEventListener('resize', () => {
            this.setupCanvas();
        });
    }

    setupMenu() {
        document.getElementById('startGame').addEventListener('click', () => {
            document.getElementById('mainMenu').classList.add('hidden');
            document.getElementById('gameScreen').classList.remove('hidden');
            this.canvas.requestPointerLock();
        });

        document.getElementById('showInstructions').addEventListener('click', () => {
            document.getElementById('mainMenu').classList.add('hidden');
            document.getElementById('instructionsScreen').classList.remove('hidden');
        });

        document.getElementById('backToMenu').addEventListener('click', () => {
            document.getElementById('instructionsScreen').classList.add('hidden');
            document.getElementById('mainMenu').classList.remove('hidden');
        });
    }

    updatePlayer() {
        // Movimento
        let moveX = 0;
        let moveZ = 0;
        const speed = 0.5;

        if (this.keys['w']) {
            moveX -= Math.sin(this.player.rotation) * speed;
            moveZ -= Math.cos(this.player.rotation) * speed;
        }
        if (this.keys['s']) {
            moveX += Math.sin(this.player.rotation) * speed;
            moveZ += Math.cos(this.player.rotation) * speed;
        }
        if (this.keys['a']) {
            moveX -= Math.cos(this.player.rotation) * speed;
            moveZ += Math.sin(this.player.rotation) * speed;
        }
        if (this.keys['d']) {
            moveX += Math.cos(this.player.rotation) * speed;
            moveZ -= Math.sin(this.player.rotation) * speed;
        }

        // Colisão simples no eixo X
        const newX = this.player.x + moveX;
        if (!this.isSolid(newX, this.player.y, this.player.z)) {
            this.player.x = newX;
        }

        // Colisão simples no eixo Z
        const newZ = this.player.z + moveZ;
        if (!this.isSolid(this.player.x, this.player.y, newZ)) {
            this.player.z = newZ;
        }

        // Gravidade e pulo
        this.player.velocityY -= this.gravity;
        const newY = this.player.y + this.player.velocityY;

        if (this.isSolid(this.player.x, newY, this.player.z)) {
            this.player.velocityY = 0;
            this.player.onGround = true;
        } else {
            this.player.y = newY;
            this.player.onGround = false;
        }

        // Pulo
        if (this.keys[' '] && this.player.onGround) {
            this.player.velocityY = this.jumpPower;
            this.player.onGround = false;
        }
    }

    isSolid(x, y, z) {
        const blockX = Math.floor(x);
        const blockY = Math.floor(y);
        const blockZ = Math.floor(z);
        
        if (blockY < 0 || blockY >= 10) return false;
        if (blockX < 0 || blockX >= this.worldSize) return true;
        if (blockZ < 0 || blockZ >= this.worldSize) return true;
        
        return this.world[blockX] && this.world[blockX][blockZ] && 
               this.world[blockX][blockZ][blockY] !== undefined;
    }

    getTargetBlock() {
        // Simulação simples de raycasting
        const maxDistance = 5;
        const step = 0.1;
        
        for (let distance = 0; distance < maxDistance; distance += step) {
            const x = this.player.x - Math.sin(this.player.rotation) * Math.cos(this.player.pitch) * distance;
            const y = this.player.y + Math.sin(this.player.pitch) * distance;
            const z = this.player.z - Math.cos(this.player.rotation) * Math.cos(this.player.pitch) * distance;
            
            const blockX = Math.floor(x);
            const blockY = Math.floor(y);
            const blockZ = Math.floor(z);
            
            if (this.isSolid(blockX, blockY, blockZ)) {
                return { x: blockX, y: blockY, z: blockZ };
            }
        }
        return null;
    }

    breakBlock(x, y, z) {
        if (this.world[x] && this.world[x][z] && this.world[x][z][y] !== undefined) {
            this.world[x][z][y] = undefined;
        }
    }

    placeBlock(x, y, z) {
        if (this.selectedBlock !== 'air' && 
            !this.isSolid(x, y, z) && 
            this.world[x] && this.world[x][z]) {
            this.world[x][z][y] = this.selectedBlock;
        }
    }

    render() {
        // Limpar canvas
        this.ctx.fillStyle = '#87CEEB';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Renderizar mundo (visão simplificada)
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;

        for (let x = 0; x < this.worldSize; x++) {
            for (let z = 0; z < this.worldSize; z++) {
                for (let y = 0; y < 10; y++) {
                    if (this.world[x][z][y]) {
                        this.renderBlock(x, y, z, this.world[x][z][y]);
                    }
                }
            }
        }
    }

    renderBlock(x, y, z, type) {
        const ctx = this.ctx;
        const scale = 20;
        const distance = Math.sqrt(
            Math.pow(x - this.player.x, 2) + 
            Math.pow(z - this.player.z, 2)
        );
        
        if (distance > 10) return;

        const screenX = (x - this.player.x) * scale + this.canvas.width / 2;
        const screenY = this.canvas.height / 2 - (y - this.player.y) * scale - (z - this.player.z) * scale;

        // Cores dos blocos
        const colors = {
            grass: '#55AA55',
            dirt: '#8B4513',
            stone: '#888888',
            wood: '#8B5A2B',
            air: 'transparent'
        };

        if (colors[type]) {
            ctx.fillStyle = colors[type];
            ctx.fillRect(screenX - scale/2, screenY - scale/2, scale, scale);
            
            // Borda
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 1;
            ctx.strokeRect(screenX - scale/2, screenY - scale/2, scale, scale);
        }
    }

    gameLoop() {
        this.updatePlayer();
        this.render();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Iniciar o jogo quando a página carregar
window.addEventListener('load', () => {
    new MinecraftGame();
});
