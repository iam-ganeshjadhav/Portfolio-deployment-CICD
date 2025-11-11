# 🌐 Portfolio Deployment using Jenkins and AWS EC2  

## 🚀 Project Overview  
This project demonstrates a **Continuous Integration and Continuous Deployment (CI/CD)** pipeline that automatically deploys a **Portfolio Website** hosted on **AWS EC2**, using **Jenkins** and **GitHub Webhooks** for automation.

---

## 🧩 Architecture  

| Step | Component | Description |
|------|------------|-------------|
| 1️⃣ | **GitHub Repository** | Stores the portfolio source code and Jenkins pipeline configuration. |
| 2️⃣ | **Jenkins Server (EC2 Instance 1)** | Automates build, test, and deployment using a Jenkins Pipeline. |
| 3️⃣ | **Deployment Server (EC2 Instance 2)** | Hosts the portfolio website files served via Nginx or Apache. |
| 4️⃣ | **GitHub Webhook** | Triggers Jenkins automatically whenever code is pushed to the GitHub repo. |

**Workflow:**

**Developer → GitHub → Jenkins (Build & Deploy) → Deployment Server (AWS EC2)**


![J](IMG/4.png)




---

## ⚙️ Tools & Technologies  

| Category | Tools Used |
|-----------|-------------|
| **Version Control** | Git & GitHub |
| **CI/CD Tool** | Jenkins |
| **Hosting** | AWS EC2 |
| **Web Server** | Apache / Nginx |
| **Build Trigger** | GitHub Webhook |
| **Frontend** | HTML, CSS, JavaScript |

---

## 📁 Project Structure  
```bash
├── images/index.html
├── style.css
├── script.js
├── index.html
├── jenkinsfile
└── README.md
```

---

## 🔧 Steps to Deploy  

### 1️⃣ Setup AWS EC2 Instances
- Create **2 EC2 instances**:  
  - **Instance 1:** Jenkins Server  
  - **Instance 2:** Deployment Server  
- Configure **security groups** to allow SSH (port 22), HTTP (port 80), and Jenkins (port 8080).

---

### 2️⃣ Install and Configure Jenkins  
- Install Jenkins on the first EC2 instance.  
- Install required plugins:  
  - Git  
  - SSH Agent  
  - Pipeline  
- Create a **Jenkins pipeline job** using **SCM (GitHub)** and paste your repo URL.  

---

### 3️⃣ Configure GitHub Webhook  
- In your GitHub repository, go to:  
  **Settings → Webhooks → Add Webhook**  
- Payload URL: `http://<jenkins-server-ip>:8080/github-webhook/`  
- Content type: `application/json`  
- Trigger: **Push events**

---

### 4️⃣ Jenkinsfile Example  

```groovy
pipeline {
  agent any

  environment {
    REMOTE_USER = "ubuntu"
    REMOTE_HOST = "13.204.69.53"
    REMOTE_DIR  = "/var/www/html"
    SSH_CRED    = "node-key"
  }

  stages {

    stage('Checkout Repository') {
      steps {
        git url: 'https://github.com/iam-ganeshjadhav/Portfolio-deployment-CICD.git', branch: 'main'
      }
    }

    stage('Deploy to EC2') {
      steps {
        sshagent(credentials: [env.SSH_CRED]) {
          sh '''
            echo "🔧 Preparing server (Apache setup)..."
            ssh -o StrictHostKeyChecking=no ${REMOTE_USER}@${REMOTE_HOST} "
              # Install Apache if missing
              if ! command -v apache2 >/dev/null 2>&1 && ! command -v httpd >/dev/null 2>&1; then
                echo '📦 Installing Apache...'
                if [ -x \$(command -v apt) ]; then
                  sudo apt update -y && sudo apt install -y apache2
                elif [ -x \$(command -v dnf) ]; then
                  sudo dnf install -y httpd
                fi
              fi

              # Enable and start Apache
              if [ -x \$(command -v systemctl) ]; then
                sudo systemctl enable apache2 || sudo systemctl enable httpd
                sudo systemctl start apache2 || sudo systemctl start httpd
              fi

              # Prepare web directory
              sudo mkdir -p ${REMOTE_DIR}
              sudo chown -R ${REMOTE_USER}:${REMOTE_USER} ${REMOTE_DIR}
              sudo chmod -R 755 ${REMOTE_DIR}
            "

            echo "🧹 Cleaning old files..."
            ssh -o StrictHostKeyChecking=no ${REMOTE_USER}@${REMOTE_HOST} "rm -rf ${REMOTE_DIR}/*"

            echo "📦 Uploading new website files..."
            scp -o StrictHostKeyChecking=no -r * ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_DIR}/

            echo "🔁 Restarting Apache..."
            ssh -o StrictHostKeyChecking=no ${REMOTE_USER}@${REMOTE_HOST} "
              sudo systemctl restart apache2 || sudo systemctl restart httpd
            "

            echo "✅ Deployment Complete!"
          '''
        }
      }
    }
  }

  post {
    success {
      echo "🎉 Portfolio deployed successfully to EC2 (Apache): http://${env.REMOTE_HOST}"
    }
    failure {
      echo "❌ Deployment failed!"
    }
  }
}
```
## 🖼️ Screenshots  

| 🪜 Step | 🧾 Description | 🖼️ Screenshot |
|:--------:|----------------|---------------|
| 1️⃣ | **github Dashboard** | ![Jenkins Dashboard](IMG/2.png) |
| 2️⃣ | **Build Success in Jenkins** | ![Build Success](IMG/3.png) |
| 3️⃣ | **Portfolio Deployed on AWS EC2** | ![Portfolio Deployed](IMG/1.png) |

## ✅ Project Status  

| 🧩 Feature | 🚦 Status |
|:-----------|:----------:|
| **CI/CD Pipeline** | ✅ Functional |
| **Auto Deployment via Webhook** | 🚀 Enabled |
| **Hosted on AWS EC2** | ☁️ Active |
| **Build Logs in Jenkins** | 🧾 Verified |

## 👨‍💻 Author  

**Ganesh Jadhav**  
💼 **DevOps & Cloud Enthusiast**

🌐 [GitHub Profile](https://github.com/iam-ganeshjadhav)

🔗 [LinkedIn](https://www.linkedin.com/in/your-linkedin-profile) 

📧 **jadhavg9370@gmail.com**

---

## 🏁 Conclusion  

This project provides a **hands-on DevOps CI/CD workflow** using **Jenkins** and **AWS EC2**.  
With every code push to **GitHub**, Jenkins automatically builds and deploys the updated portfolio to the AWS server — achieving **zero manual deployment** and ensuring **continuous delivery**.  

⭐ **If you like this project, don't forget to give it a star on GitHub!**

